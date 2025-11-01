/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { CarrierBankTransfer } from "./events/carrier/CarrierBankTransfer.ts";
import type { CarrierBuy } from "./events/carrier/CarrierBuy.ts";
import type { CarrierCrewServices } from "./events/carrier/CarrierCrewServices.ts";
import type { CarrierDepositFuel } from "./events/carrier/CarrierDepositFuel.ts";
import type { CarrierDockingPermission } from "./events/carrier/CarrierDockingPermission.ts";
import type { CarrierFinance } from "./events/carrier/CarrierFinance.ts";
import type { CarrierJump } from "./events/carrier/CarrierJump.ts";
import type { CarrierJumpCancelled } from "./events/carrier/CarrierJumpCancelled.ts";
import type { CarrierJumpRequest } from "./events/carrier/CarrierJumpRequest.ts";
import type { CarrierLocation } from "./events/carrier/CarrierLocation.ts";
import type { CarrierModulePack } from "./events/carrier/CarrierModulePack.ts";
import type { CarrierNameChange } from "./events/carrier/CarrierNameChange.ts";
import type { CarrierShipPack } from "./events/carrier/CarrierShipPack.ts";
import type { CarrierStats } from "./events/carrier/CarrierStats.ts";
import type { CarrierTradeOrder } from "./events/carrier/CarrierTradeOrder.ts";
import type { Bounty } from "./events/combat/Bounty.ts";
import type { CapShipBond } from "./events/combat/CapShipBond.ts";
import type { Died } from "./events/combat/Died.ts";
import type { EscapeInterdiction } from "./events/combat/EscapeInterdiction.ts";
import type { FactionKillBond } from "./events/combat/FactionKillBond.ts";
import type { FighterDestroyed } from "./events/combat/FighterDestroyed.ts";
import type { HeatDamage } from "./events/combat/HeatDamage.ts";
import type { HeatWarning } from "./events/combat/HeatWarning.ts";
import type { HullDamage } from "./events/combat/HullDamage.ts";
import type { Interdicted } from "./events/combat/Interdicted.ts";
import type { Interdiction } from "./events/combat/Interdiction.ts";
import type { PVPKill } from "./events/combat/PVPKill.ts";
import type { ShieldState } from "./events/combat/ShieldState.ts";
import type { ShipTargeted } from "./events/combat/ShipTargeted.ts";
import type { SRVDestroyed } from "./events/combat/SRVDestroyed.ts";
import type { UnderAttack } from "./events/combat/UnderAttack.ts";
import type { BuyExplorationData } from "./events/exploration/BuyExplorationData.ts";
import type { CodexEntry } from "./events/exploration/CodexEntry.ts";
import type { DiscoveryScan } from "./events/exploration/DiscoveryScan.ts";
import type { FSSAllBodiesFound } from "./events/exploration/FSSAllBodiesFound.ts";
import type { FSSBodySignals } from "./events/exploration/FSSBodySignals.ts";
import type { FSSDiscoveryScan } from "./events/exploration/FSSDiscoveryScan.ts";
import type { FSSSignalDiscovered } from "./events/exploration/FSSSignalDiscovered.ts";
import type { MaterialCollected } from "./events/exploration/MaterialCollected.ts";
import type { MaterialDiscarded } from "./events/exploration/MaterialDiscarded.ts";
import type { MaterialDiscovered } from "./events/exploration/MaterialDiscovered.ts";
import type { MultiSellExplorationData } from "./events/exploration/MultiSellExplorationData.ts";
import type { NavBeaconScan } from "./events/exploration/NavBeaconScan.ts";
import type { SAAScanComplete } from "./events/exploration/SAAScanComplete.ts";
import type { SAASignalsFound } from "./events/exploration/SAASignalsFound.ts";
import type { Scan } from "./events/exploration/Scan.ts";
import type { ScanBaryCentre } from "./events/exploration/ScanBaryCentre.ts";
import type { Screenshot } from "./events/exploration/Screenshot.ts";
import type { SellExplorationData } from "./events/exploration/SellExplorationData.ts";
import type { Backpack } from "./events/odyssey/Backpack.ts";
import type { BackpackChange } from "./events/odyssey/BackpackChange.ts";
import type { BookDropship } from "./events/odyssey/BookDropship.ts";
import type { BookTaxi } from "./events/odyssey/BookTaxi.ts";
import type { BuyMicroResources } from "./events/odyssey/BuyMicroResources.ts";
import type { BuySuit } from "./events/odyssey/BuySuit.ts";
import type { BuyWeapon } from "./events/odyssey/BuyWeapon.ts";
import type { CancelDropship } from "./events/odyssey/CancelDropship.ts";
import type { CancelTaxi } from "./events/odyssey/CancelTaxi.ts";
import type { CollectItems } from "./events/odyssey/CollectItems.ts";
import type { CreateSuitLoadout } from "./events/odyssey/CreateSuitLoadout.ts";
import type { DeleteSuitLoadout } from "./events/odyssey/DeleteSuitLoadout.ts";
import type { Disembark } from "./events/odyssey/Disembark.ts";
import type { DropItems } from "./events/odyssey/DropItems.ts";
import type { DropshipDeploy } from "./events/odyssey/DropshipDeploy.ts";
import type { Embark } from "./events/odyssey/Embark.ts";
import type { FCMaterials } from "./events/odyssey/FCMaterials.ts";
import type { LoadoutEquipModule } from "./events/odyssey/LoadoutEquipModule.ts";
import type { RenameSuitLoadout } from "./events/odyssey/RenameSuitLoadout.ts";
import type { ScanOrganic } from "./events/odyssey/ScanOrganic.ts";
import type { SellMicroResources } from "./events/odyssey/SellMicroResources.ts";
import type { SellOrganicData } from "./events/odyssey/SellOrganicData.ts";
import type { SellSuit } from "./events/odyssey/SellSuit.ts";
import type { SellWeapon } from "./events/odyssey/SellWeapon.ts";
import type { ShipLocker } from "./events/odyssey/ShipLocker.ts";
import type { SuitLoadout } from "./events/odyssey/SuitLoadout.ts";
import type { SwitchSuitLoadout } from "./events/odyssey/SwitchSuitLoadout.ts";
import type { TradeMicroResources } from "./events/odyssey/TradeMicroResources.ts";
import type { TransferMicroResources } from "./events/odyssey/TransferMicroResources.ts";
import type { UpgradeSuit } from "./events/odyssey/UpgradeSuit.ts";
import type { UpgradeWeapon } from "./events/odyssey/UpgradeWeapon.ts";
import type { UseConsumable } from "./events/odyssey/UseConsumable.ts";
import type { AfmuRepairs } from "./events/other/AfmuRepairs.ts";
import type { ApproachSettlement } from "./events/other/ApproachSettlement.ts";
import type { CargoTransfer } from "./events/other/CargoTransfer.ts";
import type { ChangeCrewRole } from "./events/other/ChangeCrewRole.ts";
import type { CockpitBreached } from "./events/other/CockpitBreached.ts";
import type { CommitCrime } from "./events/other/CommitCrime.ts";
import type { Continued } from "./events/other/Continued.ts";
import type { CrewLaunchFighter } from "./events/other/CrewLaunchFighter.ts";
import type { CrewMemberJoins } from "./events/other/CrewMemberJoins.ts";
import type { CrewMemberQuits } from "./events/other/CrewMemberQuits.ts";
import type { CrewMemberRoleChange } from "./events/other/CrewMemberRoleChange.ts";
import type { CrimeVictim } from "./events/other/CrimeVictim.ts";
import type { DatalinkScan } from "./events/other/DatalinkScan.ts";
import type { DatalinkVoucher } from "./events/other/DatalinkVoucher.ts";
import type { DataScanned } from "./events/other/DataScanned.ts";
import type { DockFighter } from "./events/other/DockFighter.ts";
import type { DockSRV } from "./events/other/DockSRV.ts";
import type { EndCrewSession } from "./events/other/EndCrewSession.ts";
import type { FighterRebuilt } from "./events/other/FighterRebuilt.ts";
import type { Friends } from "./events/other/Friends.ts";
import type { FuelScoop } from "./events/other/FuelScoop.ts";
import type { JetConeBoost } from "./events/other/JetConeBoost.ts";
import type { JetConeDamage } from "./events/other/JetConeDamage.ts";
import type { JoinACrew } from "./events/other/JoinACrew.ts";
import type { KickCrewMember } from "./events/other/KickCrewMember.ts";
import type { LaunchDrone } from "./events/other/LaunchDrone.ts";
import type { LaunchFighter } from "./events/other/LaunchFighter.ts";
import type { LaunchSRV } from "./events/other/LaunchSRV.ts";
import type { ModuleInfo } from "./events/other/ModuleInfo.ts";
import type { Music } from "./events/other/Music.ts";
import type { NpcCrewPaidWage } from "./events/other/NpcCrewPaidWage.ts";
import type { NpcCrewRank } from "./events/other/NpcCrewRank.ts";
import type { Promotion } from "./events/other/Promotion.ts";
import type { ProspectedAsteroid } from "./events/other/ProspectedAsteroid.ts";
import type { QuitACrew } from "./events/other/QuitACrew.ts";
import type { RebootRepair } from "./events/other/RebootRepair.ts";
import type { ReceiveText } from "./events/other/ReceiveText.ts";
import type { RepairDrone } from "./events/other/RepairDrone.ts";
import type { ReservoirReplenished } from "./events/other/ReservoirReplenished.ts";
import type { Resupply } from "./events/other/Resupply.ts";
import type { Resurrect } from "./events/other/Resurrect.ts";
import type { Scanned } from "./events/other/Scanned.ts";
import type { SelfDestruct } from "./events/other/SelfDestruct.ts";
import type { SendText } from "./events/other/SendText.ts";
import type { Shutdown } from "./events/other/Shutdown.ts";
import type { SupercruiseDestinationDrop } from "./events/other/SupercruiseDestinationDrop.ts";
import type { Synthesis } from "./events/other/Synthesis.ts";
import type { SystemsShutdown } from "./events/other/SystemsShutdown.ts";
import type { USSDrop } from "./events/other/USSDrop.ts";
import type { VehicleSwitch } from "./events/other/VehicleSwitch.ts";
import type { WingAdd } from "./events/other/WingAdd.ts";
import type { WingInvite } from "./events/other/WingInvite.ts";
import type { WingJoin } from "./events/other/WingJoin.ts";
import type { WingLeave } from "./events/other/WingLeave.ts";
import type { DeliverPowerMicroResources } from "./events/powerplay/DeliverPowerMicroResources.ts";
import type { PowerplayCollect } from "./events/powerplay/PowerplayCollect.ts";
import type { PowerplayDefect } from "./events/powerplay/PowerplayDefect.ts";
import type { PowerplayDeliver } from "./events/powerplay/PowerplayDeliver.ts";
import type { PowerplayFastTrack } from "./events/powerplay/PowerplayFastTrack.ts";
import type { PowerplayJoin } from "./events/powerplay/PowerplayJoin.ts";
import type { PowerplayLeave } from "./events/powerplay/PowerplayLeave.ts";
import type { PowerplayMerits } from "./events/powerplay/PowerplayMerits.ts";
import type { PowerplayRank } from "./events/powerplay/PowerplayRank.ts";
import type { PowerplaySalary } from "./events/powerplay/PowerplaySalary.ts";
import type { PowerplayVote } from "./events/powerplay/PowerplayVote.ts";
import type { PowerplayVoucher } from "./events/powerplay/PowerplayVoucher.ts";
import type { AppliedToSquadron } from "./events/squadrons/AppliedToSquadron.ts";
import type { InvitedToSquadron } from "./events/squadrons/InvitedToSquadron.ts";
import type { JoinedSquadron } from "./events/squadrons/JoinedSquadron.ts";
import type { LeftSquadron } from "./events/squadrons/LeftSquadron.ts";
import type { SharedBookmarkToSquadron } from "./events/squadrons/SharedBookmarkToSquadron.ts";
import type { SquadronCreated } from "./events/squadrons/SquadronCreated.ts";
import type { SquadronDemotion } from "./events/squadrons/SquadronDemotion.ts";
import type { SquadronPromotion } from "./events/squadrons/SquadronPromotion.ts";
import type { SquadronStartup } from "./events/squadrons/SquadronStartup.ts";
import type { Cargo } from "./events/startup/Cargo.ts";
import type { ClearSavedGame } from "./events/startup/ClearSavedGame.ts";
import type { Commander } from "./events/startup/Commander.ts";
import type { Fileheader } from "./events/startup/Fileheader.ts";
import type { LoadGame } from "./events/startup/LoadGame.ts";
import type { Loadout } from "./events/startup/Loadout.ts";
import type { Materials } from "./events/startup/Materials.ts";
import type { Missions } from "./events/startup/Missions.ts";
import type { NewCommander } from "./events/startup/NewCommander.ts";
import type { Passengers } from "./events/startup/Passengers.ts";
import type { Powerplay } from "./events/startup/Powerplay.ts";
import type { Progress } from "./events/startup/Progress.ts";
import type { Rank } from "./events/startup/Rank.ts";
import type { Reputation } from "./events/startup/Reputation.ts";
import type { Statistics } from "./events/startup/Statistics.ts";
import type { BuyAmmo } from "./events/station/BuyAmmo.ts";
import type { BuyDrones } from "./events/station/BuyDrones.ts";
import type { CargoDepot } from "./events/station/CargoDepot.ts";
import type { CommunityGoal } from "./events/station/CommunityGoal.ts";
import type { CommunityGoalDiscard } from "./events/station/CommunityGoalDiscard.ts";
import type { CommunityGoalJoin } from "./events/station/CommunityGoalJoin.ts";
import type { CommunityGoalReward } from "./events/station/CommunityGoalReward.ts";
import type { CrewAssign } from "./events/station/CrewAssign.ts";
import type { CrewFire } from "./events/station/CrewFire.ts";
import type { CrewHire } from "./events/station/CrewHire.ts";
import type { EngineerApply } from "./events/station/EngineerApply.ts";
import type { EngineerContribution } from "./events/station/EngineerContribution.ts";
import type { EngineerCraft } from "./events/station/EngineerCraft.ts";
import type { EngineerLegacyConvert } from "./events/station/EngineerLegacyConvert.ts";
import type { EngineerProgress } from "./events/station/EngineerProgress.ts";
import type { FetchRemoteModule } from "./events/station/FetchRemoteModule.ts";
import type { Market } from "./events/station/Market.ts";
import type { MassModuleStore } from "./events/station/MassModuleStore.ts";
import type { MaterialTrade } from "./events/station/MaterialTrade.ts";
import type { MissionAbandoned } from "./events/station/MissionAbandoned.ts";
import type { MissionAccepted } from "./events/station/MissionAccepted.ts";
import type { MissionCompleted } from "./events/station/MissionCompleted.ts";
import type { MissionFailed } from "./events/station/MissionFailed.ts";
import type { MissionRedirected } from "./events/station/MissionRedirected.ts";
import type { ModuleBuy } from "./events/station/ModuleBuy.ts";
import type { ModuleBuyAndStore } from "./events/station/ModuleBuyAndStore.ts";
import type { ModuleRetrieve } from "./events/station/ModuleRetrieve.ts";
import type { ModuleSell } from "./events/station/ModuleSell.ts";
import type { ModuleSellRemote } from "./events/station/ModuleSellRemote.ts";
import type { ModuleStore } from "./events/station/ModuleStore.ts";
import type { ModuleSwap } from "./events/station/ModuleSwap.ts";
import type { Outfitting } from "./events/station/Outfitting.ts";
import type { PayBounties } from "./events/station/PayBounties.ts";
import type { PayFines } from "./events/station/PayFines.ts";
import type { PayLegacyFines } from "./events/station/PayLegacyFines.ts";
import type { RedeemVoucher } from "./events/station/RedeemVoucher.ts";
import type { RefuelAll } from "./events/station/RefuelAll.ts";
import type { RefuelPartial } from "./events/station/RefuelPartial.ts";
import type { Repair } from "./events/station/Repair.ts";
import type { RepairAll } from "./events/station/RepairAll.ts";
import type { RestockVehicle } from "./events/station/RestockVehicle.ts";
import type { ScientificResearch } from "./events/station/ScientificResearch.ts";
import type { SearchAndRescue } from "./events/station/SearchAndRescue.ts";
import type { SellDrones } from "./events/station/SellDrones.ts";
import type { SellShipOnRebuy } from "./events/station/SellShipOnRebuy.ts";
import type { SetUserShipName } from "./events/station/SetUserShipName.ts";
import type { ShipRedeemed } from "./events/station/ShipRedeemed.ts";
import type { Shipyard } from "./events/station/Shipyard.ts";
import type { ShipyardBankDeposit } from "./events/station/ShipyardBankDeposit.ts";
import type { ShipyardBuy } from "./events/station/ShipyardBuy.ts";
import type { ShipyardNew } from "./events/station/ShipyardNew.ts";
import type { ShipyardRedeem } from "./events/station/ShipyardRedeem.ts";
import type { ShipyardSell } from "./events/station/ShipyardSell.ts";
import type { ShipyardSwap } from "./events/station/ShipyardSwap.ts";
import type { ShipyardTransfer } from "./events/station/ShipyardTransfer.ts";
import type { StoredModules } from "./events/station/StoredModules.ts";
import type { StoredShips } from "./events/station/StoredShips.ts";
import type { TechnologyBroker } from "./events/station/TechnologyBroker.ts";
import type { AsteroidCracked } from "./events/trade/AsteroidCracked.ts";
import type { BuyTradeData } from "./events/trade/BuyTradeData.ts";
import type { CollectCargo } from "./events/trade/CollectCargo.ts";
import type { EjectCargo } from "./events/trade/EjectCargo.ts";
import type { MarketBuy } from "./events/trade/MarketBuy.ts";
import type { MarketSell } from "./events/trade/MarketSell.ts";
import type { MiningRefined } from "./events/trade/MiningRefined.ts";
import type { ApproachBody } from "./events/travel/ApproachBody.ts";
import type { Docked } from "./events/travel/Docked.ts";
import type { DockingCancelled } from "./events/travel/DockingCancelled.ts";
import type { DockingDenied } from "./events/travel/DockingDenied.ts";
import type { DockingGranted } from "./events/travel/DockingGranted.ts";
import type { DockingRequested } from "./events/travel/DockingRequested.ts";
import type { DockingTimeout } from "./events/travel/DockingTimeout.ts";
import type { FSDJump } from "./events/travel/FSDJump.ts";
import type { FSDTarget } from "./events/travel/FSDTarget.ts";
import type { LeaveBody } from "./events/travel/LeaveBody.ts";
import type { Liftoff } from "./events/travel/Liftoff.ts";
import type { Location } from "./events/travel/Location.ts";
import type { NavRoute } from "./events/travel/NavRoute.ts";
import type { NavRouteClear } from "./events/travel/NavRouteClear.ts";
import type { StartJump } from "./events/travel/StartJump.ts";
import type { SupercruiseEntry } from "./events/travel/SupercruiseEntry.ts";
import type { SupercruiseExit } from "./events/travel/SupercruiseExit.ts";
import type { Touchdown } from "./events/travel/Touchdown.ts";
import type { Undocked } from "./events/travel/Undocked.ts";

/**
 * Union type of all existing journal event types.
 */
export type AnyJournalEvent
    = ApproachBody
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
    | CancelTaxi
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
    | CarrierLocation
    | CarrierModulePack
    | CarrierNameChange
    | CarrierShipPack
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
    | DeliverPowerMicroResources
    | PowerplayCollect
    | PowerplayDefect
    | PowerplayDeliver
    | PowerplayFastTrack
    | PowerplayJoin
    | PowerplayLeave
    | PowerplayMerits
    | PowerplayRank
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
    | SharedBookmarkToSquadron
    | ShieldState
    | ShipLocker
    | ShipRedeemed
    | ShipTargeted
    | ShipyardBankDeposit
    | ShipyardBuy
    | ShipyardNew
    | ShipyardRedeem
    | ShipyardSell
    | ShipyardSwap
    | ShipyardTransfer
    | Shipyard
    | Shutdown
    | SquadronCreated
    | SquadronDemotion
    | SquadronPromotion
    | SquadronStartup
    | SRVDestroyed
    | StartJump
    | Statistics
    | StoredModules
    | StoredShips
    | SuitLoadout
    | SupercruiseDestinationDrop
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

/** Union-type of all journal event names. */
export type JournalEventName = AnyJournalEvent["event"];
