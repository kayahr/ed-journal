/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

/** The station services. */
export type StationService =
    | "dock"
    | "autodock"
    | "blackmarket"
    | "commodities"
    | "contacts"
    | "exploration"
    | "missions"
    | "outfitting"
    | "crewlounge"
    | "rearm"
    | "refuel"
    | "repair"
    | "shipyard"
    | "tuning"
    | "engineer"
    | "missionsgenerated"
    | "facilitator"
    | "flightcontroller"
    | "stationoperations"
    | "ondockmission"
    | "powerplay"
    | "searchrescue"
    | "materialtrader"
    | "techBroker"
    | "stationMenu"
    | "carriermanagement"
    | "carrierfuel"
    | "voucherredemption"
    | "shop"
    | "carriervendor"
    | "livery"
    | "modulepacks"
    | "socialspace"
    | "bartender"
    | "vistagenomics"
    | "pioneersupplies"
    | "apexinterstellar"
    | "frontlinesolutions";

/**
 * Corrects an older station service string to correct new value.
 *
 * @param service - The station service which may be out-of-date.
 * @return The new station service name.
 */
export function correctStationService(service: string): StationService {
    if (service < "a") {
        if (service === "Workshop") {
            // Workshop has been renamed to engineer
            return "engineer";
        } else if (service === "SearchAndRescue") {
            // SearchAndRescue has been renamed to searchrescue
            return "searchrescue";
        } else if (service === "TechBroker") {
            // This looks like a mistake in newer lower-cased service names...
            return "techBroker";
        } else if (service === "StationMenu") {
            // This looks like a mistake in newer lower-cased service names...
            return "stationMenu";
        } else {
            return service.toLowerCase() as StationService;
        }
    }
    return service as StationService;
}
