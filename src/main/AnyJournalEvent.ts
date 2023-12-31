/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { CarrierBankTransfer } from "./events/carrier/CarrierBankTransfer";
import type { CarrierBuy } from "./events/carrier/CarrierBuy";
import type { CarrierCrewServices } from "./events/carrier/CarrierCrewServices";
import type { CarrierDepositFuel } from "./events/carrier/CarrierDepositFuel";
import type { CarrierDockingPermission } from "./events/carrier/CarrierDockingPermission";
import type { CarrierFinance } from "./events/carrier/CarrierFinance";
import type { CarrierJump } from "./events/carrier/CarrierJump";
import type { CarrierJumpCancelled } from "./events/carrier/CarrierJumpCancelled";
import type { CarrierJumpRequest } from "./events/carrier/CarrierJumpRequest";
import type { CarrierNameChange } from "./events/carrier/CarrierNameChange";
import type { CarrierStats } from "./events/carrier/CarrierStats";
import type { CarrierTradeOrder } from "./events/carrier/CarrierTradeOrder";
import type { Bounty } from "./events/combat/Bounty";
import type { CapShipBond } from "./events/combat/CapShipBond";
import type { Died } from "./events/combat/Died";
import type { EscapeInterdiction } from "./events/combat/EscapeInterdiction";
import type { FactionKillBond } from "./events/combat/FactionKillBond";
import type { FighterDestroyed } from "./events/combat/FighterDestroyed";
import type { HeatDamage } from "./events/combat/HeatDamage";
import type { HeatWarning } from "./events/combat/HeatWarning";
import type { HullDamage } from "./events/combat/HullDamage";
import type { Interdicted } from "./events/combat/Interdicted";
import type { Interdiction } from "./events/combat/Interdiction";
import type { PVPKill } from "./events/combat/PVPKill";
import type { ShieldState } from "./events/combat/ShieldState";
import type { ShipTargeted } from "./events/combat/ShipTargeted";
import type { SRVDestroyed } from "./events/combat/SRVDestroyed";
import type { UnderAttack } from "./events/combat/UnderAttack";
import type { BuyExplorationData } from "./events/exploration/BuyExplorationData";
import type { CodexEntry } from "./events/exploration/CodexEntry";
import type { DiscoveryScan } from "./events/exploration/DiscoveryScan";
import type { FSSAllBodiesFound } from "./events/exploration/FSSAllBodiesFound";
import type { FSSBodySignals } from "./events/exploration/FSSBodySignals";
import type { FSSDiscoveryScan } from "./events/exploration/FSSDiscoveryScan";
import type { FSSSignalDiscovered } from "./events/exploration/FSSSignalDiscovered";
import type { MaterialCollected } from "./events/exploration/MaterialCollected";
import type { MaterialDiscarded } from "./events/exploration/MaterialDiscarded";
import type { MaterialDiscovered } from "./events/exploration/MaterialDiscovered";
import type { MultiSellExplorationData } from "./events/exploration/MultiSellExplorationData";
import type { NavBeaconScan } from "./events/exploration/NavBeaconScan";
import type { SAAScanComplete } from "./events/exploration/SAAScanComplete";
import type { SAASignalsFound } from "./events/exploration/SAASignalsFound";
import type { Scan } from "./events/exploration/Scan";
import type { ScanBaryCentre } from "./events/exploration/ScanBaryCentre";
import type { Screenshot } from "./events/exploration/Screenshot";
import type { SellExplorationData } from "./events/exploration/SellExplorationData";
import type { Backpack } from "./events/odyssey/Backpack";
import type { BackpackChange } from "./events/odyssey/BackpackChange";
import type { BookDropship } from "./events/odyssey/BookDropship";
import type { BookTaxi } from "./events/odyssey/BookTaxi";
import type { BuyMicroResources } from "./events/odyssey/BuyMicroResources";
import type { BuySuit } from "./events/odyssey/BuySuit";
import type { BuyWeapon } from "./events/odyssey/BuyWeapon";
import type { CancelDropship } from "./events/odyssey/CancelDropship";
import type { CollectItems } from "./events/odyssey/CollectItems";
import type { CreateSuitLoadout } from "./events/odyssey/CreateSuitLoadout";
import type { DeleteSuitLoadout } from "./events/odyssey/DeleteSuitLoadout";
import type { Disembark } from "./events/odyssey/Disembark";
import type { DropItems } from "./events/odyssey/DropItems";
import type { DropshipDeploy } from "./events/odyssey/DropshipDeploy";
import type { Embark } from "./events/odyssey/Embark";
import type { FCMaterials } from "./events/odyssey/FCMaterials";
import type { LoadoutEquipModule } from "./events/odyssey/LoadoutEquipModule";
import type { RenameSuitLoadout } from "./events/odyssey/RenameSuitLoadout";
import type { ScanOrganic } from "./events/odyssey/ScanOrganic";
import type { SellMicroResources } from "./events/odyssey/SellMicroResources";
import type { SellOrganicData } from "./events/odyssey/SellOrganicData";
import type { SellSuit } from "./events/odyssey/SellSuit";
import type { SellWeapon } from "./events/odyssey/SellWeapon";
import type { ShipLocker } from "./events/odyssey/ShipLocker";
import type { SuitLoadout } from "./events/odyssey/SuitLoadout";
import type { SwitchSuitLoadout } from "./events/odyssey/SwitchSuitLoadout";
import type { TradeMicroResources } from "./events/odyssey/TradeMicroResources";
import type { TransferMicroResources } from "./events/odyssey/TransferMicroResources";
import type { UpgradeSuit } from "./events/odyssey/UpgradeSuit";
import type { UpgradeWeapon } from "./events/odyssey/UpgradeWeapon";
import type { UseConsumable } from "./events/odyssey/UseConsumable";
import type { AfmuRepairs } from "./events/other/AfmuRepairs";
import type { ApproachSettlement } from "./events/other/ApproachSettlement";
import type { CargoTransfer } from "./events/other/CargoTransfer";
import type { ChangeCrewRole } from "./events/other/ChangeCrewRole";
import type { CockpitBreached } from "./events/other/CockpitBreached";
import type { CommitCrime } from "./events/other/CommitCrime";
import type { Continued } from "./events/other/Continued";
import type { CrewLaunchFighter } from "./events/other/CrewLaunchFighter";
import type { CrewMemberJoins } from "./events/other/CrewMemberJoins";
import type { CrewMemberQuits } from "./events/other/CrewMemberQuits";
import type { CrewMemberRoleChange } from "./events/other/CrewMemberRoleChange";
import type { CrimeVictim } from "./events/other/CrimeVictim";
import type { DatalinkScan } from "./events/other/DatalinkScan";
import type { DatalinkVoucher } from "./events/other/DatalinkVoucher";
import type { DataScanned } from "./events/other/DataScanned";
import type { DockFighter } from "./events/other/DockFighter";
import type { DockSRV } from "./events/other/DockSRV";
import type { EndCrewSession } from "./events/other/EndCrewSession";
import type { FighterRebuilt } from "./events/other/FighterRebuilt";
import type { Friends } from "./events/other/Friends";
import type { FuelScoop } from "./events/other/FuelScoop";
import type { JetConeBoost } from "./events/other/JetConeBoost";
import type { JetConeDamage } from "./events/other/JetConeDamage";
import type { JoinACrew } from "./events/other/JoinACrew";
import type { KickCrewMember } from "./events/other/KickCrewMember";
import type { LaunchDrone } from "./events/other/LaunchDrone";
import type { LaunchFighter } from "./events/other/LaunchFighter";
import type { LaunchSRV } from "./events/other/LaunchSRV";
import type { ModuleInfo } from "./events/other/ModuleInfo";
import type { Music } from "./events/other/Music";
import type { NpcCrewPaidWage } from "./events/other/NpcCrewPaidWage";
import type { NpcCrewRank } from "./events/other/NpcCrewRank";
import type { Promotion } from "./events/other/Promotion";
import type { ProspectedAsteroid } from "./events/other/ProspectedAsteroid";
import type { QuitACrew } from "./events/other/QuitACrew";
import type { RebootRepair } from "./events/other/RebootRepair";
import type { ReceiveText } from "./events/other/ReceiveText";
import type { RepairDrone } from "./events/other/RepairDrone";
import type { ReservoirReplenished } from "./events/other/ReservoirReplenished";
import type { Resupply } from "./events/other/Resupply";
import type { Resurrect } from "./events/other/Resurrect";
import type { Scanned } from "./events/other/Scanned";
import type { SelfDestruct } from "./events/other/SelfDestruct";
import type { SendText } from "./events/other/SendText";
import type { Shutdown } from "./events/other/Shutdown";
import type { Synthesis } from "./events/other/Synthesis";
import type { SystemsShutdown } from "./events/other/SystemsShutdown";
import type { USSDrop } from "./events/other/USSDrop";
import type { VehicleSwitch } from "./events/other/VehicleSwitch";
import type { WingAdd } from "./events/other/WingAdd";
import type { WingInvite } from "./events/other/WingInvite";
import type { WingJoin } from "./events/other/WingJoin";
import type { WingLeave } from "./events/other/WingLeave";
import type { PowerplayCollect } from "./events/powerplay/PowerplayCollect";
import type { PowerplayDefect } from "./events/powerplay/PowerplayDefect";
import type { PowerplayDeliver } from "./events/powerplay/PowerplayDeliver";
import type { PowerplayFastTrack } from "./events/powerplay/PowerplayFastTrack";
import type { PowerplayJoin } from "./events/powerplay/PowerplayJoin";
import type { PowerplayLeave } from "./events/powerplay/PowerplayLeave";
import type { PowerplaySalary } from "./events/powerplay/PowerplaySalary";
import type { PowerplayVote } from "./events/powerplay/PowerplayVote";
import type { PowerplayVoucher } from "./events/powerplay/PowerplayVoucher";
import type { AppliedToSquadron } from "./events/squadrons/AppliedToSquadron";
import type { InvitedToSquadron } from "./events/squadrons/InvitedToSquadron";
import type { JoinedSquadron } from "./events/squadrons/JoinedSquadron";
import type { LeftSquadron } from "./events/squadrons/LeftSquadron";
import type { SquadronStartup } from "./events/squadrons/SquadronStartup";
import type { Cargo } from "./events/startup/Cargo";
import type { ClearSavedGame } from "./events/startup/ClearSavedGame";
import type { Commander } from "./events/startup/Commander";
import type { Fileheader } from "./events/startup/Fileheader";
import type { LoadGame } from "./events/startup/LoadGame";
import type { Loadout } from "./events/startup/Loadout";
import type { Materials } from "./events/startup/Materials";
import type { Missions } from "./events/startup/Missions";
import type { NewCommander } from "./events/startup/NewCommander";
import type { Passengers } from "./events/startup/Passengers";
import type { Powerplay } from "./events/startup/Powerplay";
import type { Progress } from "./events/startup/Progress";
import type { Rank } from "./events/startup/Rank";
import type { Reputation } from "./events/startup/Reputation";
import type { Statistics } from "./events/startup/Statistics";
import type { BuyAmmo } from "./events/station/BuyAmmo";
import type { BuyDrones } from "./events/station/BuyDrones";
import type { CargoDepot } from "./events/station/CargoDepot";
import type { CommunityGoal } from "./events/station/CommunityGoal";
import type { CommunityGoalDiscard } from "./events/station/CommunityGoalDiscard";
import type { CommunityGoalJoin } from "./events/station/CommunityGoalJoin";
import type { CommunityGoalReward } from "./events/station/CommunityGoalReward";
import type { CrewAssign } from "./events/station/CrewAssign";
import type { CrewFire } from "./events/station/CrewFire";
import type { CrewHire } from "./events/station/CrewHire";
import type { EngineerApply } from "./events/station/EngineerApply";
import type { EngineerContribution } from "./events/station/EngineerContribution";
import type { EngineerCraft } from "./events/station/EngineerCraft";
import type { EngineerLegacyConvert } from "./events/station/EngineerLegacyConvert";
import type { EngineerProgress } from "./events/station/EngineerProgress";
import type { FetchRemoteModule } from "./events/station/FetchRemoteModule";
import type { Market } from "./events/station/Market";
import type { MassModuleStore } from "./events/station/MassModuleStore";
import type { MaterialTrade } from "./events/station/MaterialTrade";
import type { MissionAbandoned } from "./events/station/MissionAbandoned";
import type { MissionAccepted } from "./events/station/MissionAccepted";
import type { MissionCompleted } from "./events/station/MissionCompleted";
import type { MissionFailed } from "./events/station/MissionFailed";
import type { MissionRedirected } from "./events/station/MissionRedirected";
import type { ModuleBuy } from "./events/station/ModuleBuy";
import type { ModuleBuyAndStore } from "./events/station/ModuleBuyAndStore";
import type { ModuleRetrieve } from "./events/station/ModuleRetrieve";
import type { ModuleSell } from "./events/station/ModuleSell";
import type { ModuleSellRemote } from "./events/station/ModuleSellRemote";
import type { ModuleStore } from "./events/station/ModuleStore";
import type { ModuleSwap } from "./events/station/ModuleSwap";
import type { Outfitting } from "./events/station/Outfitting";
import type { PayBounties } from "./events/station/PayBounties";
import type { PayFines } from "./events/station/PayFines";
import type { PayLegacyFines } from "./events/station/PayLegacyFines";
import type { RedeemVoucher } from "./events/station/RedeemVoucher";
import type { RefuelAll } from "./events/station/RefuelAll";
import type { RefuelPartial } from "./events/station/RefuelPartial";
import type { Repair } from "./events/station/Repair";
import type { RepairAll } from "./events/station/RepairAll";
import type { RestockVehicle } from "./events/station/RestockVehicle";
import type { ScientificResearch } from "./events/station/ScientificResearch";
import type { SearchAndRescue } from "./events/station/SearchAndRescue";
import type { SellDrones } from "./events/station/SellDrones";
import type { SellShipOnRebuy } from "./events/station/SellShipOnRebuy";
import type { SetUserShipName } from "./events/station/SetUserShipName";
import type { Shipyard } from "./events/station/Shipyard";
import type { ShipyardBuy } from "./events/station/ShipyardBuy";
import type { ShipyardNew } from "./events/station/ShipyardNew";
import type { ShipyardSell } from "./events/station/ShipyardSell";
import type { ShipyardSwap } from "./events/station/ShipyardSwap";
import type { ShipyardTransfer } from "./events/station/ShipyardTransfer";
import type { StoredModules } from "./events/station/StoredModules";
import type { StoredShips } from "./events/station/StoredShips";
import type { TechnologyBroker } from "./events/station/TechnologyBroker";
import type { AsteroidCracked } from "./events/trade/AsteroidCracked";
import type { BuyTradeData } from "./events/trade/BuyTradeData";
import type { CollectCargo } from "./events/trade/CollectCargo";
import type { EjectCargo } from "./events/trade/EjectCargo";
import type { MarketBuy } from "./events/trade/MarketBuy";
import type { MarketSell } from "./events/trade/MarketSell";
import type { MiningRefined } from "./events/trade/MiningRefined";
import type { ApproachBody } from "./events/travel/ApproachBody";
import type { Docked } from "./events/travel/Docked";
import type { DockingCancelled } from "./events/travel/DockingCancelled";
import type { DockingDenied } from "./events/travel/DockingDenied";
import type { DockingGranted } from "./events/travel/DockingGranted";
import type { DockingRequested } from "./events/travel/DockingRequested";
import type { DockingTimeout } from "./events/travel/DockingTimeout";
import type { FSDJump } from "./events/travel/FSDJump";
import type { FSDTarget } from "./events/travel/FSDTarget";
import type { LeaveBody } from "./events/travel/LeaveBody";
import type { Liftoff } from "./events/travel/Liftoff";
import type { Location } from "./events/travel/Location";
import type { NavRoute } from "./events/travel/NavRoute";
import type { NavRouteClear } from "./events/travel/NavRouteClear";
import type { StartJump } from "./events/travel/StartJump";
import type { SupercruiseEntry } from "./events/travel/SupercruiseEntry";
import type { SupercruiseExit } from "./events/travel/SupercruiseExit";
import type { Touchdown } from "./events/travel/Touchdown";
import type { Undocked } from "./events/travel/Undocked";

/**
 * Union type of all existing journal event types.
 */
export type AnyJournalEvent =
    | ApproachBody
    | AfmuRepairs
    | AppliedToSquadron
    | ApproachSettlement
    | AsteroidCracked
    | Backpack
    | BackpackChange
    | BookDropship
    | BookTaxi
    | Bounty
    | BuyAmmo
    | BuyDrones
    | BuyExplorationData
    | BuyMicroResources
    | BuySuit
    | BuyTradeData
    | BuyWeapon
    | CancelDropship
    | CapShipBond
    | Cargo
    | CargoDepot
    | CargoTransfer
    | CarrierBankTransfer
    | CarrierBuy
    | CarrierCrewServices
    | CarrierDepositFuel
    | CarrierDockingPermission
    | CarrierFinance
    | CarrierJump
    | CarrierJumpCancelled
    | CarrierJumpRequest
    | CarrierNameChange
    | CarrierStats
    | CarrierTradeOrder
    | ChangeCrewRole
    | ClearSavedGame
    | CockpitBreached
    | CodexEntry
    | CollectCargo
    | CollectItems
    | Commander
    | CommitCrime
    | CommunityGoalDiscard
    | CommunityGoalJoin
    | CommunityGoalReward
    | CommunityGoal
    | Continued
    | CreateSuitLoadout
    | CrewAssign
    | CrewFire
    | CrewHire
    | CrewLaunchFighter
    | CrewMemberJoins
    | CrewMemberQuits
    | CrewMemberRoleChange
    | CrimeVictim
    | DatalinkScan
    | DatalinkVoucher
    | DataScanned
    | DeleteSuitLoadout
    | Died
    | DiscoveryScan
    | Disembark
    | Docked
    | DockFighter
    | DockingCancelled
    | DockingDenied
    | DockingGranted
    | DockingRequested
    | DockingTimeout
    | DockSRV
    | DropItems
    | DropshipDeploy
    | EjectCargo
    | Embark
    | EndCrewSession
    | EngineerApply
    | EngineerContribution
    | EngineerCraft
    | EngineerLegacyConvert
    | EngineerProgress
    | EscapeInterdiction
    | FactionKillBond
    | FCMaterials
    | FetchRemoteModule
    | FighterDestroyed
    | FighterRebuilt
    | Fileheader
    | Friends
    | FSDJump
    | FSDTarget
    | FSSAllBodiesFound
    | FSSBodySignals
    | FSSDiscoveryScan
    | FSSSignalDiscovered
    | FuelScoop
    | HeatDamage
    | HeatWarning
    | HullDamage
    | Interdicted
    | Interdiction
    | InvitedToSquadron
    | JetConeBoost
    | JetConeDamage
    | JoinACrew
    | JoinedSquadron
    | LeftSquadron
    | KickCrewMember
    | LaunchDrone
    | LaunchFighter
    | LaunchSRV
    | LeaveBody
    | Liftoff
    | LoadGame
    | Loadout
    | LoadoutEquipModule
    | Location
    | MarketBuy
    | MarketSell
    | Market
    | MassModuleStore
    | MaterialCollected
    | MaterialDiscarded
    | MaterialDiscovered
    | Materials
    | MaterialTrade
    | MiningRefined
    | MissionAbandoned
    | MissionAccepted
    | MissionCompleted
    | MissionFailed
    | MissionRedirected
    | Missions
    | ModuleBuy
    | ModuleBuyAndStore
    | ModuleInfo
    | ModuleRetrieve
    | ModuleSellRemote
    | ModuleSell
    | ModuleStore
    | ModuleSwap
    | MultiSellExplorationData
    | Music
    | NavBeaconScan
    | NavRoute
    | NavRouteClear
    | NewCommander
    | NpcCrewPaidWage
    | NpcCrewRank
    | Outfitting
    | Passengers
    | PayBounties
    | PayFines
    | PayLegacyFines
    | PowerplayCollect
    | PowerplayDefect
    | PowerplayDeliver
    | PowerplayFastTrack
    | PowerplayJoin
    | PowerplayLeave
    | PowerplaySalary
    | Powerplay
    | PowerplayVote
    | PowerplayVoucher
    | Progress
    | Promotion
    | ProspectedAsteroid
    | PVPKill
    | QuitACrew
    | Rank
    | RebootRepair
    | ReceiveText
    | RedeemVoucher
    | RefuelAll
    | RefuelPartial
    | RenameSuitLoadout
    | RepairAll
    | RepairDrone
    | Repair
    | Reputation
    | ReservoirReplenished
    | RestockVehicle
    | Resupply
    | Resurrect
    | SAASignalsFound
    | SAAScanComplete
    | Scanned
    | Scan
    | ScanBaryCentre
    | ScanOrganic
    | ScientificResearch
    | Screenshot
    | SearchAndRescue
    | SelfDestruct
    | SellDrones
    | SellExplorationData
    | SellMicroResources
    | SellOrganicData
    | SellShipOnRebuy
    | SellSuit
    | SellWeapon
    | SendText
    | SetUserShipName
    | ShieldState
    | ShipLocker
    | ShipTargeted
    | ShipyardBuy
    | ShipyardNew
    | ShipyardSell
    | ShipyardSwap
    | ShipyardTransfer
    | Shipyard
    | Shutdown
    | SquadronStartup
    | SRVDestroyed
    | StartJump
    | Statistics
    | StoredModules
    | StoredShips
    | SuitLoadout
    | SupercruiseEntry
    | SupercruiseExit
    | SwitchSuitLoadout
    | Synthesis
    | SystemsShutdown
    | TechnologyBroker
    | Touchdown
    | TradeMicroResources
    | TransferMicroResources
    | UnderAttack
    | Undocked
    | UpgradeSuit
    | UpgradeWeapon
    | UseConsumable
    | USSDrop
    | VehicleSwitch
    | WingAdd
    | WingInvite
    | WingJoin
    | WingLeave;
