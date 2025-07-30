/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { CarrierBankTransfer } from "./events/carrier/CarrierBankTransfer.js";
import type { CarrierBuy } from "./events/carrier/CarrierBuy.js";
import type { CarrierCrewServices } from "./events/carrier/CarrierCrewServices.js";
import type { CarrierDepositFuel } from "./events/carrier/CarrierDepositFuel.js";
import type { CarrierDockingPermission } from "./events/carrier/CarrierDockingPermission.js";
import type { CarrierFinance } from "./events/carrier/CarrierFinance.js";
import type { CarrierJump } from "./events/carrier/CarrierJump.js";
import type { CarrierJumpCancelled } from "./events/carrier/CarrierJumpCancelled.js";
import type { CarrierJumpRequest } from "./events/carrier/CarrierJumpRequest.js";
import type { CarrierLocation } from "./events/carrier/CarrierLocation.js";
import type { CarrierModulePack } from "./events/carrier/CarrierModulePack.js";
import type { CarrierNameChange } from "./events/carrier/CarrierNameChange.js";
import type { CarrierShipPack } from "./events/carrier/CarrierShipPack.js";
import type { CarrierStats } from "./events/carrier/CarrierStats.js";
import type { CarrierTradeOrder } from "./events/carrier/CarrierTradeOrder.js";
import type { Bounty } from "./events/combat/Bounty.js";
import type { CapShipBond } from "./events/combat/CapShipBond.js";
import type { Died } from "./events/combat/Died.js";
import type { EscapeInterdiction } from "./events/combat/EscapeInterdiction.js";
import type { FactionKillBond } from "./events/combat/FactionKillBond.js";
import type { FighterDestroyed } from "./events/combat/FighterDestroyed.js";
import type { HeatDamage } from "./events/combat/HeatDamage.js";
import type { HeatWarning } from "./events/combat/HeatWarning.js";
import type { HullDamage } from "./events/combat/HullDamage.js";
import type { Interdicted } from "./events/combat/Interdicted.js";
import type { Interdiction } from "./events/combat/Interdiction.js";
import type { PVPKill } from "./events/combat/PVPKill.js";
import type { ShieldState } from "./events/combat/ShieldState.js";
import type { ShipTargeted } from "./events/combat/ShipTargeted.js";
import type { SRVDestroyed } from "./events/combat/SRVDestroyed.js";
import type { UnderAttack } from "./events/combat/UnderAttack.js";
import type { BuyExplorationData } from "./events/exploration/BuyExplorationData.js";
import type { CodexEntry } from "./events/exploration/CodexEntry.js";
import type { DiscoveryScan } from "./events/exploration/DiscoveryScan.js";
import type { FSSAllBodiesFound } from "./events/exploration/FSSAllBodiesFound.js";
import type { FSSBodySignals } from "./events/exploration/FSSBodySignals.js";
import type { FSSDiscoveryScan } from "./events/exploration/FSSDiscoveryScan.js";
import type { FSSSignalDiscovered } from "./events/exploration/FSSSignalDiscovered.js";
import type { MaterialCollected } from "./events/exploration/MaterialCollected.js";
import type { MaterialDiscarded } from "./events/exploration/MaterialDiscarded.js";
import type { MaterialDiscovered } from "./events/exploration/MaterialDiscovered.js";
import type { MultiSellExplorationData } from "./events/exploration/MultiSellExplorationData.js";
import type { NavBeaconScan } from "./events/exploration/NavBeaconScan.js";
import type { SAAScanComplete } from "./events/exploration/SAAScanComplete.js";
import type { SAASignalsFound } from "./events/exploration/SAASignalsFound.js";
import type { Scan } from "./events/exploration/Scan.js";
import type { ScanBaryCentre } from "./events/exploration/ScanBaryCentre.js";
import type { Screenshot } from "./events/exploration/Screenshot.js";
import type { SellExplorationData } from "./events/exploration/SellExplorationData.js";
import type { Backpack } from "./events/odyssey/Backpack.js";
import type { BackpackChange } from "./events/odyssey/BackpackChange.js";
import type { BookDropship } from "./events/odyssey/BookDropship.js";
import type { BookTaxi } from "./events/odyssey/BookTaxi.js";
import type { BuyMicroResources } from "./events/odyssey/BuyMicroResources.js";
import type { BuySuit } from "./events/odyssey/BuySuit.js";
import type { BuyWeapon } from "./events/odyssey/BuyWeapon.js";
import type { CancelDropship } from "./events/odyssey/CancelDropship.js";
import type { CancelTaxi } from "./events/odyssey/CancelTaxi.js";
import type { CollectItems } from "./events/odyssey/CollectItems.js";
import type { CreateSuitLoadout } from "./events/odyssey/CreateSuitLoadout.js";
import type { DeleteSuitLoadout } from "./events/odyssey/DeleteSuitLoadout.js";
import type { Disembark } from "./events/odyssey/Disembark.js";
import type { DropItems } from "./events/odyssey/DropItems.js";
import type { DropshipDeploy } from "./events/odyssey/DropshipDeploy.js";
import type { Embark } from "./events/odyssey/Embark.js";
import type { FCMaterials } from "./events/odyssey/FCMaterials.js";
import type { LoadoutEquipModule } from "./events/odyssey/LoadoutEquipModule.js";
import type { RenameSuitLoadout } from "./events/odyssey/RenameSuitLoadout.js";
import type { ScanOrganic } from "./events/odyssey/ScanOrganic.js";
import type { SellMicroResources } from "./events/odyssey/SellMicroResources.js";
import type { SellOrganicData } from "./events/odyssey/SellOrganicData.js";
import type { SellSuit } from "./events/odyssey/SellSuit.js";
import type { SellWeapon } from "./events/odyssey/SellWeapon.js";
import type { ShipLocker } from "./events/odyssey/ShipLocker.js";
import type { SuitLoadout } from "./events/odyssey/SuitLoadout.js";
import type { SwitchSuitLoadout } from "./events/odyssey/SwitchSuitLoadout.js";
import type { TradeMicroResources } from "./events/odyssey/TradeMicroResources.js";
import type { TransferMicroResources } from "./events/odyssey/TransferMicroResources.js";
import type { UpgradeSuit } from "./events/odyssey/UpgradeSuit.js";
import type { UpgradeWeapon } from "./events/odyssey/UpgradeWeapon.js";
import type { UseConsumable } from "./events/odyssey/UseConsumable.js";
import type { AfmuRepairs } from "./events/other/AfmuRepairs.js";
import type { ApproachSettlement } from "./events/other/ApproachSettlement.js";
import type { CargoTransfer } from "./events/other/CargoTransfer.js";
import type { ChangeCrewRole } from "./events/other/ChangeCrewRole.js";
import type { CockpitBreached } from "./events/other/CockpitBreached.js";
import type { CommitCrime } from "./events/other/CommitCrime.js";
import type { Continued } from "./events/other/Continued.js";
import type { CrewLaunchFighter } from "./events/other/CrewLaunchFighter.js";
import type { CrewMemberJoins } from "./events/other/CrewMemberJoins.js";
import type { CrewMemberQuits } from "./events/other/CrewMemberQuits.js";
import type { CrewMemberRoleChange } from "./events/other/CrewMemberRoleChange.js";
import type { CrimeVictim } from "./events/other/CrimeVictim.js";
import type { DatalinkScan } from "./events/other/DatalinkScan.js";
import type { DatalinkVoucher } from "./events/other/DatalinkVoucher.js";
import type { DataScanned } from "./events/other/DataScanned.js";
import type { DockFighter } from "./events/other/DockFighter.js";
import type { DockSRV } from "./events/other/DockSRV.js";
import type { EndCrewSession } from "./events/other/EndCrewSession.js";
import type { FighterRebuilt } from "./events/other/FighterRebuilt.js";
import type { Friends } from "./events/other/Friends.js";
import type { FuelScoop } from "./events/other/FuelScoop.js";
import type { JetConeBoost } from "./events/other/JetConeBoost.js";
import type { JetConeDamage } from "./events/other/JetConeDamage.js";
import type { JoinACrew } from "./events/other/JoinACrew.js";
import type { KickCrewMember } from "./events/other/KickCrewMember.js";
import type { LaunchDrone } from "./events/other/LaunchDrone.js";
import type { LaunchFighter } from "./events/other/LaunchFighter.js";
import type { LaunchSRV } from "./events/other/LaunchSRV.js";
import type { ModuleInfo } from "./events/other/ModuleInfo.js";
import type { Music } from "./events/other/Music.js";
import type { NpcCrewPaidWage } from "./events/other/NpcCrewPaidWage.js";
import type { NpcCrewRank } from "./events/other/NpcCrewRank.js";
import type { Promotion } from "./events/other/Promotion.js";
import type { ProspectedAsteroid } from "./events/other/ProspectedAsteroid.js";
import type { QuitACrew } from "./events/other/QuitACrew.js";
import type { RebootRepair } from "./events/other/RebootRepair.js";
import type { ReceiveText } from "./events/other/ReceiveText.js";
import type { RepairDrone } from "./events/other/RepairDrone.js";
import type { ReservoirReplenished } from "./events/other/ReservoirReplenished.js";
import type { Resupply } from "./events/other/Resupply.js";
import type { Resurrect } from "./events/other/Resurrect.js";
import type { Scanned } from "./events/other/Scanned.js";
import type { SelfDestruct } from "./events/other/SelfDestruct.js";
import type { SendText } from "./events/other/SendText.js";
import type { Shutdown } from "./events/other/Shutdown.js";
import type { SupercruiseDestinationDrop } from "./events/other/SupercruiseDestinationDrop.js";
import type { Synthesis } from "./events/other/Synthesis.js";
import type { SystemsShutdown } from "./events/other/SystemsShutdown.js";
import type { USSDrop } from "./events/other/USSDrop.js";
import type { VehicleSwitch } from "./events/other/VehicleSwitch.js";
import type { WingAdd } from "./events/other/WingAdd.js";
import type { WingInvite } from "./events/other/WingInvite.js";
import type { WingJoin } from "./events/other/WingJoin.js";
import type { WingLeave } from "./events/other/WingLeave.js";
import type { DeliverPowerMicroResources } from "./events/powerplay/DeliverPowerMicroResources.js";
import type { PowerplayCollect } from "./events/powerplay/PowerplayCollect.js";
import type { PowerplayDefect } from "./events/powerplay/PowerplayDefect.js";
import type { PowerplayDeliver } from "./events/powerplay/PowerplayDeliver.js";
import type { PowerplayFastTrack } from "./events/powerplay/PowerplayFastTrack.js";
import type { PowerplayJoin } from "./events/powerplay/PowerplayJoin.js";
import type { PowerplayLeave } from "./events/powerplay/PowerplayLeave.js";
import type { PowerplayMerits } from "./events/powerplay/PowerplayMerits.js";
import type { PowerplayRank } from "./events/powerplay/PowerplayRank.js";
import type { PowerplaySalary } from "./events/powerplay/PowerplaySalary.js";
import type { PowerplayVote } from "./events/powerplay/PowerplayVote.js";
import type { PowerplayVoucher } from "./events/powerplay/PowerplayVoucher.js";
import type { AppliedToSquadron } from "./events/squadrons/AppliedToSquadron.js";
import type { InvitedToSquadron } from "./events/squadrons/InvitedToSquadron.js";
import type { JoinedSquadron } from "./events/squadrons/JoinedSquadron.js";
import type { LeftSquadron } from "./events/squadrons/LeftSquadron.js";
import type { SquadronStartup } from "./events/squadrons/SquadronStartup.js";
import type { Cargo } from "./events/startup/Cargo.js";
import type { ClearSavedGame } from "./events/startup/ClearSavedGame.js";
import type { Commander } from "./events/startup/Commander.js";
import type { Fileheader } from "./events/startup/Fileheader.js";
import type { LoadGame } from "./events/startup/LoadGame.js";
import type { Loadout } from "./events/startup/Loadout.js";
import type { Materials } from "./events/startup/Materials.js";
import type { Missions } from "./events/startup/Missions.js";
import type { NewCommander } from "./events/startup/NewCommander.js";
import type { Passengers } from "./events/startup/Passengers.js";
import type { Powerplay } from "./events/startup/Powerplay.js";
import type { Progress } from "./events/startup/Progress.js";
import type { Rank } from "./events/startup/Rank.js";
import type { Reputation } from "./events/startup/Reputation.js";
import type { Statistics } from "./events/startup/Statistics.js";
import type { BuyAmmo } from "./events/station/BuyAmmo.js";
import type { BuyDrones } from "./events/station/BuyDrones.js";
import type { CargoDepot } from "./events/station/CargoDepot.js";
import type { CommunityGoal } from "./events/station/CommunityGoal.js";
import type { CommunityGoalDiscard } from "./events/station/CommunityGoalDiscard.js";
import type { CommunityGoalJoin } from "./events/station/CommunityGoalJoin.js";
import type { CommunityGoalReward } from "./events/station/CommunityGoalReward.js";
import type { CrewAssign } from "./events/station/CrewAssign.js";
import type { CrewFire } from "./events/station/CrewFire.js";
import type { CrewHire } from "./events/station/CrewHire.js";
import type { EngineerApply } from "./events/station/EngineerApply.js";
import type { EngineerContribution } from "./events/station/EngineerContribution.js";
import type { EngineerCraft } from "./events/station/EngineerCraft.js";
import type { EngineerLegacyConvert } from "./events/station/EngineerLegacyConvert.js";
import type { EngineerProgress } from "./events/station/EngineerProgress.js";
import type { FetchRemoteModule } from "./events/station/FetchRemoteModule.js";
import type { Market } from "./events/station/Market.js";
import type { MassModuleStore } from "./events/station/MassModuleStore.js";
import type { MaterialTrade } from "./events/station/MaterialTrade.js";
import type { MissionAbandoned } from "./events/station/MissionAbandoned.js";
import type { MissionAccepted } from "./events/station/MissionAccepted.js";
import type { MissionCompleted } from "./events/station/MissionCompleted.js";
import type { MissionFailed } from "./events/station/MissionFailed.js";
import type { MissionRedirected } from "./events/station/MissionRedirected.js";
import type { ModuleBuy } from "./events/station/ModuleBuy.js";
import type { ModuleBuyAndStore } from "./events/station/ModuleBuyAndStore.js";
import type { ModuleRetrieve } from "./events/station/ModuleRetrieve.js";
import type { ModuleSell } from "./events/station/ModuleSell.js";
import type { ModuleSellRemote } from "./events/station/ModuleSellRemote.js";
import type { ModuleStore } from "./events/station/ModuleStore.js";
import type { ModuleSwap } from "./events/station/ModuleSwap.js";
import type { Outfitting } from "./events/station/Outfitting.js";
import type { PayBounties } from "./events/station/PayBounties.js";
import type { PayFines } from "./events/station/PayFines.js";
import type { PayLegacyFines } from "./events/station/PayLegacyFines.js";
import type { RedeemVoucher } from "./events/station/RedeemVoucher.js";
import type { RefuelAll } from "./events/station/RefuelAll.js";
import type { RefuelPartial } from "./events/station/RefuelPartial.js";
import type { Repair } from "./events/station/Repair.js";
import type { RepairAll } from "./events/station/RepairAll.js";
import type { RestockVehicle } from "./events/station/RestockVehicle.js";
import type { ScientificResearch } from "./events/station/ScientificResearch.js";
import type { SearchAndRescue } from "./events/station/SearchAndRescue.js";
import type { SellDrones } from "./events/station/SellDrones.js";
import type { SellShipOnRebuy } from "./events/station/SellShipOnRebuy.js";
import type { SetUserShipName } from "./events/station/SetUserShipName.js";
import type { ShipRedeemed } from "./events/station/ShipRedeemed.js";
import type { Shipyard } from "./events/station/Shipyard.js";
import type { ShipyardBuy } from "./events/station/ShipyardBuy.js";
import type { ShipyardNew } from "./events/station/ShipyardNew.js";
import type { ShipyardRedeem } from "./events/station/ShipyardRedeem.js";
import type { ShipyardSell } from "./events/station/ShipyardSell.js";
import type { ShipyardSwap } from "./events/station/ShipyardSwap.js";
import type { ShipyardTransfer } from "./events/station/ShipyardTransfer.js";
import type { StoredModules } from "./events/station/StoredModules.js";
import type { StoredShips } from "./events/station/StoredShips.js";
import type { TechnologyBroker } from "./events/station/TechnologyBroker.js";
import type { AsteroidCracked } from "./events/trade/AsteroidCracked.js";
import type { BuyTradeData } from "./events/trade/BuyTradeData.js";
import type { CollectCargo } from "./events/trade/CollectCargo.js";
import type { EjectCargo } from "./events/trade/EjectCargo.js";
import type { MarketBuy } from "./events/trade/MarketBuy.js";
import type { MarketSell } from "./events/trade/MarketSell.js";
import type { MiningRefined } from "./events/trade/MiningRefined.js";
import type { ApproachBody } from "./events/travel/ApproachBody.js";
import type { Docked } from "./events/travel/Docked.js";
import type { DockingCancelled } from "./events/travel/DockingCancelled.js";
import type { DockingDenied } from "./events/travel/DockingDenied.js";
import type { DockingGranted } from "./events/travel/DockingGranted.js";
import type { DockingRequested } from "./events/travel/DockingRequested.js";
import type { DockingTimeout } from "./events/travel/DockingTimeout.js";
import type { FSDJump } from "./events/travel/FSDJump.js";
import type { FSDTarget } from "./events/travel/FSDTarget.js";
import type { LeaveBody } from "./events/travel/LeaveBody.js";
import type { Liftoff } from "./events/travel/Liftoff.js";
import type { Location } from "./events/travel/Location.js";
import type { NavRoute } from "./events/travel/NavRoute.js";
import type { NavRouteClear } from "./events/travel/NavRouteClear.js";
import type { StartJump } from "./events/travel/StartJump.js";
import type { SupercruiseEntry } from "./events/travel/SupercruiseEntry.js";
import type { SupercruiseExit } from "./events/travel/SupercruiseExit.js";
import type { Touchdown } from "./events/travel/Touchdown.js";
import type { Undocked } from "./events/travel/Undocked.js";

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
    | ShieldState
    | ShipLocker
    | ShipRedeemed
    | ShipTargeted
    | ShipyardBuy
    | ShipyardNew
    | ShipyardRedeem
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
