/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 *
 * This script assists you in exploring a star system
 */

import "source-map-support/register.js";

import {
    type AnyJournalEvent, type CodexEntry, type FSDJump, type FSSBodySignals, type FSSDiscoveryScan, type FSSSignalDiscovered, type ID, Journal,
    type SAAScanComplete, type SAASignalsFound, type Scan, type ScanOrganic
} from "@kayahr/ed-journal";
import chalk from "chalk";

const payouts: Record<string, number> = {
    "Fonticulua Fluctus": 20_000_000,
    "Tussock Stigmasis": 19_010_800,
    "Stratum Tectonicas": 19_010_800,
    "Fonticulua Segmentatus": 19_010_800,
    "Concha Biconcavis": 19_010_800,
    "Stratum Cucumisis": 16_202_800,
    "Recepta Deltahedronix": 16_202_800,
    "Fumerola Extremus": 16_202_800,
    "Clypeus Speculumi": 16_202_800,
    "Cactoida Vermis": 16_202_800,
    "Tussock Virgam": 14_313_700,
    "Recepta Conditivus": 14_313_700,
    "Recepta Umbrux": 12_934_900,
    "Osseus Discus": 12_934_900,
    "Aleoida Gravis": 12_934_900,
    "Tubus Cavas": 11_873_200,
    "Clypeus Margaritus": 11_873_200,
    "Frutexa Flammasis": 10_326_000,
    "Osseus Pellebantus": 9_739_000,
    "Clypeus Lacrimam": 8_418_000,
    "Bacterium Informem": 8_418_000,
    "Tussock Triticum": 7_774_700,
    "Tubus Compagibus": 7_774_700,
    "Frutexa Acus": 7_774_700,
    "Concha Aureolas": 7_774_700,
    "Bacterium Volu": 7_774_700,
    "Fumerola Nitris": 7_500_900,
    "Aleoida Arcus": 7_252_500,
    "Tussock Capillum": 7_025_800,
    "Fumerola Carbosis": 6_284_600,
    "Fumerola Aquatis": 6_284_600,
    "Electricae Radialem": 6_284_600,
    "Electricae Pluma": 6_284_600,
    "Aleoida Coronamus": 6_284_600,
    "Frutexa Sponsae": 5_988_000,
    "Tussock Pennata": 5_853_800,
    "Tubus Sororibus": 5_727_600,
    "Fonticulua Upupam": 5_727_600,
    "Bacterium Nebulus": 5_289_900,
    "Bacterium Scopulum": 4_934_500,
    "Bacterium Omentum": 4_638_900,
    "Concha Renibus": 4_572_400,
    "Tussock Serrati": 4_447_100,
    "Osseus Fractus": 4_027_800,
    "Bacterium Verrata": 3_897_000,
    "Fungoida Bullarum": 3_703_200,
    "Cactoida Pullulanta": 3_667_600,
    "Cactoida Cortexum": 3_667_600,
    "Tussock Caputus": 3_472_400,
    "Aleoida Spica": 3_385_200,
    "Aleoida Laminiae": 3_385_200,
    "Fungoida Gelata": 3_330_300,
    "Tussock Albata": 3_252_500,
    "Tussock Ventusa": 3_227_700,
    "Osseus Pumice": 3_156_300,
    "Fonticulua Lapida": 3_111_000,
    "Stratum Laminamus": 2_788_300,
    "Fungoida Stabitis": 2_680_300,
    "Tubus Rosarium": 2_637_500,
    "Stratum Frigus": 2_637_500,
    "Cactoida Peperatis": 2_483_600,
    "Cactoida Lapis": 2_483_600,
    "Stratum Excutitus": 2_448_900,
    "Stratum Araneamus": 2_448_900,
    "Tubus Conifer": 2_415_500,
    "Osseus Spiralis": 2_404_700,
    "Concha Labiata": 2_352_400,
    "Thargoid Mega Barnacles": 2_313_500,
    "Thargoid Barnacle Matrix": 2_313_500,
    "Thargoid Spires": 2_247_100,
    "Thargoid Spire": 2_247_100,
    "Primary Thargoid Spire": 2_247_100,
    "Minor Thargoid Spire": 2_247_100,
    "Major Thargoid Spire": 2_247_100,
    "Bacterium Tela": 1_949_000,
    "Coral Root": 1_924_600,
    "Coral Tree": 1_896_800,
    "Tussock Ignis": 1_849_000,
    "Frutexa Flabellum": 1_808_900,
    "Fonticulua Digitos": 1_804_100,
    "Tussock Divisa": 1_766_600,
    "Tussock Cultro": 1_766_600,
    "Tussock Catena": 1_766_600,
    "Bacterium Cerbrus": 1_689_800,
    "Fungoida Setisis": 1_670_100,
    "Bacterium Alcyoneum": 1_658_500,
    "Frutexa Collum": 1_639_800,
    "Frutexa Metallicum": 1_632_500,
    "Frutexa Fera": 1_632_500,
    "Crystalline Shards": 1_628_800,
    "Amphora Plant": 1_628_800,
    "Viride Brain Tree": 1_593_700,
    "Roseum Brain Tree": 1_593_700,
    "Puniceum Brain Tree": 1_593_700,
    "Ostrinum Brain Tree": 1_593_700,
    "Lividum Brain Tree": 1_593_700,
    "Lindigoticum Brain Tree": 1_593_700,
    "Gypseeum Brain Tree": 1_593_700,
    "Aureum Brain Tree": 1_593_700,
    "Viride Sinuous Tubers": 1_514_500,
    "Violaceum Sinuous Tubers": 1_514_500,
    "Roseum Sinuous Tubers": 1_514_500,
    "Prasinum Sinuous Tubers": 1_514_500,
    "Lindigoticum Sinuous Tubers": 1_514_500,
    "Caeruleum Sinuous Tubers": 1_514_500,
    "Blatteum Sinuous Tubers": 1_514_500,
    "Albidum Sinuous Tubers": 1_514_500,
    "Rubeum Bioluminescent Anemone": 1_499_900,
    "Roseum Bioluminescent Anemone": 1_499_900,
    "Roseum Anemone": 1_499_900,
    "Puniceum Anemone": 1_499_900,
    "Prasinum Bioluminescent Anemone": 1_499_900,
    "Luteolum Anemone": 1_499_900,
    "Croceum Anemone": 1_499_900,
    "Blatteum Bioluminescent Anemone": 1_499_900,
    "Osseus Cornibus": 1_483_000,
    "Bark Mounds": 1_471_900,
    "Stratum Paleas": 1_362_000,
    "Stratum Limaxus": 1_362_000,
    "Bacterium Bullaris": 1_152_500,
    "Tussock Propagito": 1_000_000,
    "Tussock Pennatis": 1_000_000,
    "Fonticulua Campestris": 1_000_000,
    "Bacterium Vesicula": 1_000_000,
    "Bacterium Aurasus": 1_000_000,
    "Bacterium Acies": 1_000_000
};
const MIN_PAYOUT = Math.min(...Object.values(payouts));
const MAX_PAYOUT = Math.max(...Object.values(payouts));

class Genus {
    private readonly genusId: string;
    private readonly genusName: string;
    private speciesId: string | null = null;
    private speciesName: string | null = null;
    private variantId: string | null = null;
    private variantName: string | null = null;
    private codexed: boolean = false;
    private samples = 0;

    public constructor(genusId: string, genusName: string) {
        this.genusId = genusId;
        this.genusName = genusName;
    }

    public scan(scan: ScanOrganic): void {
        this.speciesId = scan.Species;
        this.speciesName = scan.Species_Localised;
        this.variantId ??= scan.Variant ?? null;
        this.variantName ??= scan.Variant_Localised ?? null;
        const samples = scan.ScanType === "Log" ? 1 : scan.ScanType === "Sample" ? 2 : scan.ScanType === "Analyse" ? 3 : 0;
        this.samples = Math.max(this.samples, samples);
    }

    public codex(entry: CodexEntry): void {
        this.codexed = true;
        this.variantId ??= entry.Name;
        this.variantName ??= entry.Name_Localised;
        this.speciesName ??= this.variantName.split("-")[0]?.trim() ?? null;
    }

    public getGenusId(): string {
        return this.genusId;
    }

    public getSpeciesId(): string | null {
        return this.speciesId;
    }

    public getVariantId(): string | null {
        return this.variantId;
    }

    public toString(): string {
        return this.variantName ?? this.speciesName ?? this.genusName;
    }

    public getSamples(): number {
        return this.samples;
    }

    public isAnalysed(): boolean {
        return this.samples === 3;
    }

    public isCodexed(): boolean {
        return this.codexed;
    }

    public isScanned(): boolean {
        return this.isCodexed() && this.isAnalysed();
    }

    public getPayout(): string {
        const name = this.speciesName ?? `${this.genusName} `;
        const payout = payouts[name];
        if (payout != null) {
            return payout.toLocaleString();
        }
        let minPayout = MAX_PAYOUT;
        let maxPayout = MIN_PAYOUT;
        for (const [ species, value ] of Object.entries(payouts)) {
            if (species.startsWith(name)) {
                minPayout = Math.min(minPayout, value);
                maxPayout = Math.max(maxPayout, value);
            }
        }
        if (minPayout === maxPayout) {
            return minPayout.toLocaleString();
        }
        if (minPayout < maxPayout) {
            return `${minPayout.toLocaleString()} - ${maxPayout.toLocaleString()}`;
        }
        return "???";
    }
}

class Body {
    private readonly id: ID;
    private latestScan: Scan | null = null;
    private latestMap: SAAScanComplete | null = null;
    private latestBodySignals: FSSBodySignals | null = null;
    private latestSAASignals: SAASignalsFound | null = null;

    private readonly codexed = new Set<string>();
    private readonly scanning = new Set<string>();
    private readonly scanned = new Set<string>();
    private readonly genuses: Genus[] = [];

    public constructor(id: ID) {
        this.id = id;
    }

    public getId(): ID {
        return this.id;
    }

    public scan(scan: Scan): void {
        this.latestScan = scan;
    }

    public map(map: SAAScanComplete): void {
        this.latestMap = map;
    }

    public isScanned(): boolean {
        return this.latestScan != null;
    }

    public isMapped(): boolean {
        return this.latestMap != null;
    }

    public isSubject(): boolean {
        if (this.latestScan?.TerraformState === "Terraformable") {
            return true;
        }
        if (this.getBiologicalSignalCount() > 0) {
            return true;
        }
        if (this.latestScan?.StarType != null) {
            // Stats are not scannable
            return false;
        }
        if (this.latestScan?.BodyName.includes(" Belt Cluster ") === true) {
            return false;
        }
        const planetClass = this.latestScan?.PlanetClass ?? "";
        if (planetClass?.endsWith(" gas giant")
            || planetClass === "Icy body"
            || planetClass === "High metal content body"
            || planetClass === "Rocky body"
            || planetClass === "Rocky ice body"
            || planetClass === "Metal rich body"
            || planetClass === "Gas giant with water based life"
            || planetClass === "Gas giant with ammonia based life"
        ) {
            return false;
        }
        return true;
    }

    public getName(): string {
        return this.latestScan?.BodyName ?? "Unknown";
    }

    public recordSignals(signals: FSSBodySignals): void {
        this.latestBodySignals = signals;
    }

    public scanOrganic(scan: ScanOrganic): void {
        const genus = scan.Variant_Localised ?? scan.Species_Localised ?? scan.Genus_Localised;
        this.scanning.add(genus);
        if (scan.ScanType === "Analyse") {
            this.scanned.add(genus);
        }
        const genus2 = this.getOrCreateGenus(scan.Genus, scan.Genus_Localised);
        genus2.scan(scan);
    }

    public recordCodex(entry: CodexEntry): void {
        this.codexed.add(entry.Name_Localised);
        for (const genus of this.genuses) {
            if (entry.Name.startsWith(genus.getGenusId().replace("Genus_Name;", ""))) {
                genus.codex(entry);
            }
        }
    }

    public isCodexed(genus: string): boolean {
        for (const codex of this.codexed) {
            if (codex.startsWith(`${genus} `)) {
                return true;
            }
        }
        return false;
    }

    public isScanning(genus: string): boolean {
        for (const entry of this.scanning) {
            if (entry.startsWith(`${genus} `)) {
                return true;
            }
        }
        return false;
    }

    public isGenusScanned(genus: string): boolean {
        for (const entry of this.scanned) {
            if (entry.startsWith(`${genus} `)) {
                return true;
            }
        }
        return false;
    }

    public getGenus(id: string): Genus | null {
        return this.genuses.find(genus => genus.getGenusId() === id) ?? null;
    }

    public getOrCreateGenus(id: string, name: string): Genus {
        let genus = this.getGenus(id);
        if (genus == null) {
            this.genuses.push(genus = new Genus(id, name));
        }
        return genus;
    }

    public foundSignals(signals: SAASignalsFound): void {
        this.latestSAASignals = signals;
        for (const signal of signals.Genuses ?? []) {
            this.getOrCreateGenus(signal.Genus, signal.Genus_Localised);
        }
    }

    public getBiologicalSignalCount(): number {
        return (this.latestSAASignals ?? this.latestBodySignals)?.Signals.find(signal => signal.Type === "$SAA_SignalType_Biological;")?.Count ?? 0;
    }

    public getGenuses(): Genus[] {
        return this.genuses;
    }

    public getDescription(): string {
        const scan = this.latestScan;
        if (scan == null) {
            return "Not scanned";
        }
        const details: string[] = [];
        if (scan.PlanetClass != null) {
            details.push(scan.PlanetClass);
        }
        if (scan.TerraformState === "Terraformable") {
            details.push("Terraformable");
        }
        const bioSignals = this.getBiologicalSignalCount();
        if (bioSignals > 0) {
            details.push(`${bioSignals} bio signals`);
        }
        return details.join(", ");
    }
}

class System {
    private valid = true;
    private honked = false;
    private signalCount = 0;
    private readonly name: string;
    private readonly bodies: Body[] = [];
    private readonly signals = new Map<string, string>();

    public constructor(event: FSDJump) {
        this.name = event.StarSystem;
    }

    public processEvent(event: AnyJournalEvent): void {
        if (event.event === "FSSDiscoveryScan") {
            this.honk(event);
        } else if (event.event === "Scan") {
            console.log(event);
            this.scanBody(event);
        } else if (event.event === "SAAScanComplete") {
            console.log(event);
            this.mapBody(event);
        } else if (event.event === "SAASignalsFound") {
            console.log(event);
            this.getOrCreateBody(event.BodyID).foundSignals(event);
            this.invalidate();
        } else if (event.event === "FSSBodySignals") {
            console.log(event);
            this.getOrCreateBody(event.BodyID).recordSignals(event);
            this.invalidate();
        } else if (event.event === "FSSSignalDiscovered") {
            console.log(event);
            this.signalDiscovered(event);
            this.invalidate();
        } else if (event.event === "ScanOrganic") {
            this.getOrCreateBody(event.Body).scanOrganic(event);
            this.invalidate();
        } else if (event.event === "CodexEntry") {
            if (event.BodyID != null) {
                this.getOrCreateBody(event.BodyID).recordCodex(event);
            }
            this.invalidate();
        } else {
            console.log(event.event);
        }
    }

    private honk(event: FSSDiscoveryScan): void {
        this.honked = true;
        this.signalCount = event.BodyCount + event.NonBodyCount;
        this.invalidate();
    }

    private signalDiscovered(event: FSSSignalDiscovered): void {
        this.signals.set(event.SignalName_Localised ?? event.SignalName, event.SignalType ?? "Unknown");
        this.invalidate();
    }

    private scanBody(scan: Scan): void {
        if (scan.BodyID == null) {
            return;
        }
        const body = this.getOrCreateBody(scan.BodyID);
        body.scan(scan);
        this.invalidate();
    }

    private mapBody(map: SAAScanComplete): void {
        this.getOrCreateBody(map.BodyID).map(map);
    }

    public getBody(id: ID): Body | null {
        return this.bodies.find(body => body.getId() === id) ?? null;
    }

    public getOrCreateBody(id: ID): Body {
        let body = this.getBody(id);
        if (body == null) {
            this.bodies.push(body = new Body(id));
        }
        return body;
    }

    public getSubjects(): Body[] {
        return this.bodies.filter(body => body.isSubject() || body.isMapped()).sort((a, b) => a.getName().localeCompare(b.getName()));
    }

    private invalidate(): void {
        if (this.valid) {
            this.valid = false;
            setTimeout(() => {
                this.redraw();
                this.valid = true;
            }, 100);
        }
    }

    private redraw(): void {
        // console.clear();
        console.log("System:", chalk.bold(this.name));
        console.log();
        if (!this.honked) {
            console.log("Not honked yet");
            return;
        }
        const scannedBodies = this.bodies.filter(body => body.isScanned()).length;
        const bodyScanColor = scannedBodies === this.signalCount ? chalk.greenBright : scannedBodies === 0 ? chalk.redBright : chalk.yellowBright;
        console.log("Scanned Signals:", bodyScanColor(scannedBodies), "/", chalk.bold(this.signalCount));
        const subjects = this.getSubjects();
        const subjectCount = subjects.length;
        const subjectsMapped = subjects.filter(subject => subject.isMapped()).length;
        const mappedColor = subjectsMapped === subjectCount ? chalk.greenBright : subjectsMapped === 0 ? chalk.redBright : chalk.yellowBright;
        console.log("Mapped Subjects:", mappedColor(subjectsMapped), "/", chalk.bold(subjectCount));
        if (subjects.length > 0) {
            console.log("");
            console.log("Interesting subjects:");
            for (const subject of subjects) {
                console.log(`  [${subject.isMapped() ? chalk.greenBright("✓") : chalk.redBright("✗")}] `
                    + `${subject.getName().substring(this.name.length + 1)}: ${subject.getDescription()}`);
                const genuses = subject.getGenuses();
                if (genuses.length > 0) {
                    for (const genus of genuses) {
                        const warnings: string[] = [];
                        if (!genus.isAnalysed()) {
                            warnings.push(`Samples: ${genus.getSamples()}/3`);
                        }
                        if (!genus.isCodexed()) {
                            warnings.push("Not Codexed");
                        }
                        console.log(`     [`
                            + `${genus.isScanned() ? chalk.greenBright("✓") : chalk.redBright("✗")}] ${genus.toString()} `
                            + `(${chalk.dim(`${genus.getPayout()} Cr`)})`
                            + (warnings.length > 0 ? chalk.yellowBright(` (${warnings.join(", ")})`) : ""));
                    }
                }
            }
        }
        if (this.signals.size > 0) {
            console.log("");
            console.log("Special signals:");
            for (const [ name, type ] of this.signals.entries()) {
                console.log(`  * ${name} (${type})`);
            }
        }
    }
}

// Start watching the journal.
const journal = await Journal.open({ position: "FSDJump", watch: true });
process.on("SIGINT", () => {
    void journal.close();
});

let system: System | null = null;
for await (const event of journal) {
    if (event.event === "FSDJump") {
        system = new System(event);
    } else {
        system?.processEvent(event);
    }
}
