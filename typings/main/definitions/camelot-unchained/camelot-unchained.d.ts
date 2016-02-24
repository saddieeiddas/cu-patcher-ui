// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/CoreSettings.d.ts
declare module 'camelot-unchained/definitions/core/CoreSettings' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import channelId from 'camelot-unchained/definitions/core/constants/channelId';
class CoreSettings {
    cseApiUrl: string;
    cseApiPort: number;
    hatcheryApiUrl: string;
    hatcheryApiPort: number;
    wyrmlingApiUrl: string;
    wyrmlingApiPort: number;
    apiToken: string;
    channelId: channelId;
    constructor(channel?: channelId, token?: string);
}
export default CoreSettings;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/config/configGroup.d.ts
declare module 'camelot-unchained/definitions/core/config/configGroup' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
/**
 * These are the tags needed by the C++ Layer to know which build variables
 * to send to the window.
 */
enum configGroup {
    KEYBIND = 2,
    INPUT = 6,
    AUDIO = 8,
}
export default configGroup;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/clientInterface.d.ts
declare module 'camelot-unchained/definitions/core/clientInterface' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import configGroup from 'camelot-unchained/definitions/core/config/configGroup';
import race from 'camelot-unchained/definitions/core/constants/race';
interface clientInterface {
    initialized: boolean;
    OnInitialized(c: () => void): number;
    CancelOnInitialized(c: number): void;
    muteVolume: boolean;
    mainVolume: number;
    patchResourceChannel: number;
    loginToken: string;
    pktHash: string;
    webAPIHost: string;
    serverURL: string;
    serverTime: number;
    vsync: number;
    FOV(degrees: number): void;
    DropLight(intensity: number, radius: number, red: number, green: number, blue: number): void;
    ResetLights(): void;
    OnServerConnected(c: (isConnected: boolean) => void): number;
    CancelOnServerConnected(c: number): void;
    PlaySoundEvent(id: number): void;
    ToggleCamera(): void;
    OpenUI(name: string): void;
    CloseUI(name: string): void;
    HideUI(name: string): void;
    ShowUI(name: string): void;
    ToggleUIVisibility(name: string): void;
    FocusUI(name: string): void;
    RequestInputOwnership(): void;
    ReleaseInputOwnership(): void;
    Quit(): void;
    CrashTheGame(): void;
    OnUpdateNameplate(c: (cell: number, colorMod: number, name: string, gtag: string, title: string) => void): void;
    OnOpenUI(callback: (name: string) => void): void;
    OnCloseUI(callback: (name: string) => void): void;
    OnShowUI(callback: (name: string) => void): void;
    OnHideUI(callback: (name: string) => void): void;
    Listen(event: string): void;
    Ignore(event: string): void;
    Fire(event: string, ...args: any[]): void;
    OnEvent(callback: (event: string, ...args: any[]) => void): void;
    Respawn(id: string): void;
    OnAbilityNumbersChanged(callback: (abilityNumbers: string[]) => void): void;
    Attack(abilityID: string): void;
    OnAbilityCooldown(c: (cooldownID: number, timeStarted: number, duration: number) => void): number;
    CancelOnAbilityCooldown(c: number): void;
    OnAbilityActive(c: (currentAbility: string, timeStarted: number, timeTriggered: number, queuedAbility: string) => any): number;
    CancelOnAbilityActive(c: number): void;
    OnAbilityError(c: (message: string) => void): void;
    GetItem(itemID: string): void;
    OnGetItem(callback: (itemID: string, data: string) => void): void;
    OnItemEquipped(callback: (itemID: string) => void): void;
    OnItemUnequipped(callback: (itemID: string) => void): void;
    OnEquippedGearItemIDsChanged(callback: (gearItemIDs: string[]) => void): void;
    UnequipItem(itemID: string): void;
    OnInventoryItemIDsChanged(callback: (inventoryItemIDs: string[]) => void): void;
    EquipItem(itemID: string): void;
    OnReceiveConfigVars(c: (configs: string) => void): void;
    OnReceiveConfigVar(c: (config: any) => void): void;
    OnConfigVarChanged(c: (isChangeSuccessful: boolean) => void): void;
    SaveConfigChanges(): void;
    OnSavedConfigChanges(c: () => void): void;
    RestoreConfigDefaults(tag: configGroup): void;
    ChangeConfigVar(variable: string, value: string): void;
    CancelChangeConfig(variable: string): void;
    CancelAllConfigChanges(tag: configGroup): void;
    GetConfigVars(tag: configGroup): void;
    GetConfigVar(variable: string): void;
    OnBuildingModeChanged(c: (buildingMode: boolean) => void): void;
    OnReceiveBlocks(c: (buildingDict: any) => void): void;
    OnReceiveScreenShot(c: (screenShotString: any) => void): void;
    OnReceiveBlockTags(c: (blockID: number, tagDict: any) => void): void;
    OnCopyBlueprint(c: () => void): void;
    OnNewBlueprint(c: (index: number, name: string) => void): void;
    ToggleBuildingMode(): void;
    SetBuildingMode(c: (newMode: number) => void): void;
    RequestBlocks(): void;
    RequestBlockTags(c: (blockID: number) => void): void;
    ChangeBlockType(c: (newType: number) => void): void;
    SelectBlueprint(c: (index: number) => void): void;
    SaveBlueprint(c: (name: string) => void): void;
    RequestBlueprints(): void;
    CommitBlock(): void;
    CancelBlockPlacement(): void;
    BlockRotateX(): void;
    BlockRotateY(): void;
    BlockRotateZ(): void;
    RemoveIslands(): void;
    ApplyStability(): void;
    BlockFlipX(): void;
    BlockFlipY(): void;
    BlockFlipZ(): void;
    CopyBlueprint(): void;
    PasteBlueprint(): void;
    OpenScreenshotShare(): void;
    TakeScreenshot(): void;
    OnAnnouncement(c: (message: string, type: number) => void): void;
    OnCharacterIDChanged(c: (id: string) => void): void;
    OnCharacterFactionChanged(c: (faction: number) => void): void;
    OnCharacterRaceChanged(c: (race: race) => void): void;
    OnCharacterNameChanged(c: (name: string) => void): void;
    OnCharacterHealthChanged(c: (health: number, maxHealth: number) => void): void;
    OnCharacterStaminaChanged(c: (stamina: number, maxStamina: number) => void): void;
    OnCharacterEffectsChanged(c: (effects: string) => void): void;
    OnCharacterInjuriesChanged(c: (part: number, health: number, maxHealth: number, wounds: number) => void): void;
    Emote(emote: number): void;
    OnEnemyTargetNameChanged(callback: (name: string) => void): void;
    OnEnemyTargetHealthChanged(callback: (health: number, maxHealth: number) => void): void;
    OnEnemyTargetStaminaChanged(callback: (stamina: number, maxStamina: number) => void): void;
    OnEnemyTargetEffectsChanged(callback: (effects: string) => void): void;
    OnEnemyTargetInjuriesChanged(c: (part: number, health: number, maxHealth: number, wounds: number) => void): void;
    OnFriendlyTargetNameChanged(callback: (name: string) => void): void;
    OnFriendlyTargetHealthChanged(callback: (health: number, maxHealth: number) => void): void;
    OnFriendlyTargetStaminaChanged(callback: (stamina: number, maxStamina: number) => void): void;
    OnFriendlyTargetEffectsChanged(callback: (effects: string) => void): void;
    OnFriendlyTargetInjuriesChanged(c: (part: number, health: number, maxHealth: number, wounds: number) => void): void;
    OnBeginChat(c: (commandMode: number, text: string) => void): void;
    OnChat(c: (type: number, from: string, body: string, nick: string, iscse: boolean) => void): void;
    SendChat(type: number, to: string, body: string): void;
    JoinMUC(room: string): void;
    LeaveMUC(room: string): void;
    SendSlashCommand(command: string, parameters: string): void;
    Stuck(): void;
    ChangeZone(zoneID: number): void;
    ShowAbility(abilityID: string): void;
    OnShowAbility(callback: (abilityID: string) => void): void;
    EditAbility(abilityID: string): void;
    OnEditAbility(callback: (abilityID: string) => void): void;
    AbilityCreated(abilityID: string, primaryBaseComponentID: string, secondaryBaseComponentID: string, ability: string): void;
    OnAbilityCreated(callback: (abilityID: string, ability: string) => void): void;
    AbilityDeleted(abilityID: string): void;
    OnAbilityDeleted(callback: (abilityID: string) => void): void;
    RegisterAbility(abilityID: string, primaryBaseComponentID: string, secondaryBaseComponentID: string): void;
    OnAbilityRegistered(callback: (abilityID: string, cooldowns: string, duration: number, triggerTime: number) => void): void;
    fps: number;
    frameTime: number;
    netstats_udpPackets: number;
    netstats_udpBytes: number;
    netstats_tcpMessages: number;
    netstats_tcpBytes: number;
    netstats_players_updateBits: number;
    netstats_players_updateCount: number;
    netstats_players_newCount: number;
    netstats_players_newBits: number;
    netstats_lag: number;
    netstats_delay: number;
    netstats_selfUpdatesPerSec: number;
    netstats_syncsPerSec: number;
    particlesRenderedCount: number;
    characters: number;
    terrain: number;
    perfHUD: string;
    locationX: number;
    locationY: number;
    locationZ: number;
    serverLocationX: number;
    serverLocationY: number;
    serverLocationZ: number;
    facing: number;
    velocityX: number;
    velocityY: number;
    velocityZ: number;
    speed: number;
    horizontalSpeed: number;
    velFacing: number;
    downCollisionAngle: number;
    terrainCollisionAngle: number;
    OnConsoleText(c: (text: string) => void): void;
    ConsoleCommand(body: string): void;
    Connect(host: string, port: string, character: string, webAPIHost: string): void;
    OnLogMessage(c: (category: string, level: number, time: string, process: number, thread: number, message: string) => void): void;
}
export default clientInterface;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/client.d.ts
declare module 'camelot-unchained/definitions/core/client' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import clientInterface from 'camelot-unchained/definitions/core/clientInterface';
let client: clientInterface;
export function hasClientAPI(): clientInterface;
export default client;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/constants/abilityConstants/abilityTags.d.ts
declare module 'camelot-unchained/definitions/core/constants/abilityConstants/abilityTags' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http//mozilla.org/MPL/2.0/.
 */
enum abilityTags {
    SYSTEM = 0,
    NONAGGRESSIVE = 1,
    NONINTERACTABLE = 2,
    NOMAGIC = 3,
    WEAPON = 4,
    STYLE = 5,
    SPEED = 6,
    POTENTIAL = 7,
    TARGETING = 8,
    VOICE = 9,
    SHOUT = 10,
    INFLECTION = 11,
    AIR = 12,
    EARTH = 13,
    FIRE = 14,
    WATER = 15,
    BLAST = 16,
    LAVA = 17,
    MUD = 18,
    SAND = 19,
    STEAM = 20,
    SPRAY = 21,
    HEALING = 22,
    RESTORATION = 23,
    LIFEDRAIN = 24,
    SWIFTNESS = 25,
    DISPLACEMENT = 26,
    SELF = 27,
    DIRECT = 28,
    TOUCH = 29,
    DART = 30,
    BALL = 31,
    CLOUD = 32,
    FOUNTAIN = 33,
    WALL = 34,
    FIELD = 35,
    WAVE = 36,
    POOL = 37,
    CONE = 38,
    RUNE = 39,
    SHAPE = 40,
    RANGE = 41,
    SIZE = 42,
    INFUSION = 43,
    FOCUS = 44,
    BLOCKING = 45,
    COUNTERATTACK = 46,
    UNBLOCKABLE = 47,
    TESTTAGA = 48,
    TESTTAGB = 49,
    TESTTAGC = 50,
    TESTTAGD = 51,
    TESTTAGE = 52,
    COUNT = 53,
}
export default abilityTags;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/constants/archetype.d.ts
declare module 'camelot-unchained/definitions/core/constants/archetype' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
enum archetype {
    NONE = -1,
    FIREMAGE = 0,
    EARTHMAGE = 1,
    WATERMAGE = 2,
    FIGHTER = 3,
    HEALER = 4,
    MELEECOMBATTEST = 5,
    ARCHERTEST = 6,
}
export default archetype;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/constants/buildUIMode.d.ts
declare module 'camelot-unchained/definitions/core/constants/buildUIMode' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
enum buildUIMode {
    NOTBUILDING = 0,
    PLACINGPHANTOM = 1,
    PHANTOMPLACED = 2,
    SELECTINGBLOCK = 4,
    BLOCKSELECTED = 8,
}
export default buildUIMode;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/constants/channelId.d.ts
declare module 'camelot-unchained/definitions/core/constants/channelId' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
enum channelId {
    NONE = -1,
    HATCHERY = 4,
    WYRMLING = 10,
}
export default channelId;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/constants/emotes.d.ts
declare module 'camelot-unchained/definitions/core/constants/emotes' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
enum emotes {
    DANCE1 = 0,
    DANCE2 = 1,
    WAVE1 = 2,
    WAVE2 = 3,
    STOP = 4,
    NONE = 5,
}
export default emotes;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/constants/race.d.ts
declare module 'camelot-unchained/definitions/core/constants/race' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
enum race {
    NONE = -1,
    HAMADRYAD = 1,
    LUCHORPAN = 2,
    FIRBOG = 3,
    VALKYRIE = 4,
    HELBOUND = 5,
    FROSTGIANT = 6,
    STRM = 8,
    CAITSITH = 9,
    GOLEM = 10,
    STORMRIDERT = 12,
    STORMRIDERA = 13,
    STORMRIDERV = 14,
    HUMANMALEV = 15,
    HUMANMALEA = 16,
    HUMANMALET = 17,
}
export default race;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/constants/soundEvents.d.ts
declare module 'camelot-unchained/definitions/core/constants/soundEvents' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
const soundEvents: {
    CANCEL_ABILITY: number;
    LOCAL_PLAYER_BEGIN_CAST: number;
    LOCAL_PLAYER_BEGIN_SWING: number;
    LOCAL_PLAYER_DEATH: number;
    LOCAL_PLAYER_SPAWN: number;
    LOCAL_PLAYER_TOOK_DAMAGE: number;
    PLAY_FOOTSTEP_LEATHERBOOT_DIRT: number;
    PLAY_FOOTSTEP_METALBOOT_DIRT: number;
    PLAY_FOOTSTEP_METALBOOT_WITHMETALARMOR_DIRT: number;
    PLAY_GENERIC_PROJECTILE: number;
    PLAY_GENERIC_PROJECTILE_HIT: number;
    PLAY_INSTRUMENT_ALBION_HORNBASSMOD_LONG_DISTANT_C3_MEDIUMV: number;
    PLAY_LOADINGSCREEN: number;
    PLAY_LOADINGSCREEN_COMPLETE: number;
    PLAY_MAINMENU: number;
    PLAY_MELEE_IMPACT: number;
    PLAY_NATUREAMBIENCE: number;
    PLAY_SFX_ABILITY_ACTIVATE_SWOOSH_LOCALPLAYER: number;
    PLAY_SFX_ABILITY_CHARGING_LOOP: number;
    PLAY_SFX_ABILITY_CONE_STONE_ACTIVATE: number;
    PLAY_SFX_ABILITY_DART_STONE_ACTIVATE: number;
    PLAY_SFX_ABILITY_DIRECT_STONE_ACTIVATE: number;
    PLAY_SFX_ABILITY_HEALING_BANDAGE_END: number;
    PLAY_SFX_ABILITY_HEALING_BANDAGE_START: number;
    PLAY_SFX_ABILITY_TOUCH_STONE_ACTIVATE: number;
    PLAY_SFX_ABILITY_WAVE_STONE_ACTIVATE: number;
    PLAY_UI_ABILITYCRAFTING_ADDSELECTION: number;
    PLAY_UI_ABILITYCRAFTING_BUILD: number;
    PLAY_UI_ABILITYCRAFTING_RESET: number;
    PLAY_UI_ABILITYCRAFTING_SIDEPANEL_OPEN: number;
    PLAY_UI_MENU_BANESELECT: number;
    PLAY_UI_MENU_BOONSELECT: number;
    PLAY_UI_MENU_CHARACTERSELECT_CHANGE: number;
    PLAY_UI_MENU_CREATENEWCHARACTER: number;
    PLAY_UI_MENU_GENERALCONFIRM: number;
    PLAY_UI_MENU_GENERICSELECT: number;
    PLAY_UI_MENU_PREVIEWREALM_ARTHURIAN: number;
    PLAY_UI_MENU_PREVIEWREALM_TDD: number;
    PLAY_UI_MENU_PREVIEWREALM_VIKING: number;
    PLAY_UI_MENU_SELECTREALM: number;
    PLAY_UI_MENU_SERVERSELECT: number;
    PLAY_UI_MENUSTATE_CLOSED: number;
    PLAY_UI_MENUSTATE_OPEN: number;
    PLAY_UI_SPELLBOOK_DELETESPELL: number;
    PLAY_UI_SPELLBOOK_OPEN: number;
    PLAY_UI_SPELLBOOK_PAGEFLIP_BACKWARD: number;
    PLAY_UI_SPELLBOOK_PAGEFLIP_FORWARD: number;
    PLAY_UI_SPELLBOOK_PUTAWAY: number;
    PLAYER_BEGIN_CAST: number;
    PLAYER_BEGIN_SWING: number;
    PLAYER_DEATH: number;
    PLAYER_SPAWN: number;
    PLAYER_TOOK_DAMAGE: number;
    SET_STATE_CHARACTERCREATION_ATTRIBUTES: number;
    SET_STATE_CHARACTERCREATION_BOONSANDBANES: number;
    SET_STATE_CHARACTERCREATION_PREVIEW_ARTHURIAN: number;
    SET_STATE_CHARACTERCREATION_PREVIEW_TDD: number;
    SET_STATE_CHARACTERCREATION_PREVIEW_VIKING: number;
    SET_STATE_CHARACTERCREATION_RACE: number;
    SET_STATE_CHARACTERCREATION_SERVERSELECT: number;
    STOP_UI_MENU_PREVIEWREALM: number;
};
export default soundEvents;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/constants/tagConstraintType.d.ts
declare module 'camelot-unchained/definitions/core/constants/tagConstraintType' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
enum tagContstraintType {
    ALLOF = 0,
    ANYOF = 1,
    NONEOF = 2,
}
export default tagContstraintType;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/constants/itemType.d.ts
declare module 'camelot-unchained/definitions/core/constants/itemType' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
enum itemType {
    NONE = 0,
    EQUIPABLE = 1,
    RESOURCE = 2,
}
export default itemType;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/constants/gearSlot.d.ts
declare module 'camelot-unchained/definitions/core/constants/gearSlot' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
enum gearSlot {
    NONE = 0,
    CHEST = 1,
    LEFT_HAND = 2,
    RIGHT_HAND = 4,
    TWO_HANDED = 6,
    PANTS = 8,
    BOOTS = 16,
    LEFT_GLOVE = 32,
    RIGHT_GLOVE = 64,
    HELMET = 128,
    BELT = 256,
    SKIRT = 512,
    TABARD = 1024,
    CAPE = 2048,
}
export default gearSlot;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/constants/abilityConstants/componentType.d.ts
declare module 'camelot-unchained/definitions/core/constants/abilityConstants/componentType' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http//mozilla.org/MPL/2.0/.
 */
export enum componentType {
    Primary = 0,
    Secondary = 1,
    OptionalModifier = 2,
    SpecialModal = 3,
    IndependantModal = 4,
}
export default componentType;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/constants/abilityConstants/componentPath.d.ts
declare module 'camelot-unchained/definitions/core/constants/abilityConstants/componentPath' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http//mozilla.org/MPL/2.0/.
 */
export enum componentPath {
    'Path 1' = 0,
    'Path 2' = 1,
    'Path 3' = 2,
    'Path 4' = 3,
}
export default componentPath;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/constants/abilityConstants/componentSubType.d.ts
declare module 'camelot-unchained/definitions/core/constants/abilityConstants/componentSubType' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http//mozilla.org/MPL/2.0/.
 */
export enum componentSubType {
    None = 0,
    Rune = 1,
    Shape = 2,
    Range = 4,
    Size = 8,
    Infusion = 16,
    Focus = 32,
    Transposition = 64,
    Weapon = 128,
    Style = 256,
    Speed = 512,
    Potential = 1024,
    Target = 2048,
    Stance = 4096,
    RangedWeapon = 8192,
    Load = 16384,
    Prepare = 32768,
    Draw = 65536,
    Aim = 131072,
    Voice = 262144,
    Instrument = 524288,
    Shout = 1048576,
    Song = 2097152,
    Inflection = 4194304,
    Technique = 8388608,
    DeadPrimary = 16777216,
    DeadSecondary = 33554432,
}
export default componentSubType;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/constants/abilityConstants/componentBranchState.d.ts
declare module 'camelot-unchained/definitions/core/constants/abilityConstants/componentBranchState' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http//mozilla.org/MPL/2.0/.
 */
export enum componentBranchState {
    Disabled = 0,
    Open = 1,
    Slotted = 2,
}
export default componentBranchState;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/classes/AbilityComponent.d.ts
declare module 'camelot-unchained/definitions/core/classes/AbilityComponent' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import abilityTags from 'camelot-unchained/definitions/core/constants/abilityConstants/abilityTags';
import componentType from 'camelot-unchained/definitions/core/constants/abilityConstants/componentType';
import componentPath from 'camelot-unchained/definitions/core/constants/abilityConstants/componentPath';
import componentSubType from 'camelot-unchained/definitions/core/constants/abilityConstants/componentSubType';
import componentBranchState from 'camelot-unchained/definitions/core/constants/abilityConstants/componentBranchState';
import stats from 'camelot-unchained/definitions/core/classes/Stats';
export class ComponentBranch {
    parts: any[];
    state: componentBranchState;
}
export interface ComponentSlot {
    type: componentType;
    subType: componentSubType;
    x: number;
    y: number;
    parents: ComponentSlot[];
    children: ComponentSlot[];
    branch: ComponentBranch;
    component: AbilityComponent;
    isDisabled: boolean;
    tooltip: string;
    originalSubType: componentSubType;
    queuedAnimation: string;
}
export class AbilityComponent {
    cooldown: number;
    duration: number;
    tooltip: string;
    id: string;
    baseComponentID: number;
    name: string;
    description: string;
    icon: string;
    type: componentType;
    subType: componentSubType;
    path: componentPath;
    abillityStats: stats;
    abilityTags: abilityTags[];
    slot: ComponentSlot;
    rank: number;
    isTrained: boolean;
    isHalted: boolean;
    constructor(abilityComponent?: AbilityComponent);
    static create(): AbilityComponent;
}
export default AbilityComponent;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/classes/Ability.d.ts
declare module 'camelot-unchained/definitions/core/classes/Ability' {
import AbilityComponent from 'camelot-unchained/definitions/core/classes/AbilityComponent';
class Ability {
    id: string;
    icon: string;
    cooldowns: any[];
    duration: number;
    triggerTimeOffset: number;
    name: string;
    tooltip: string;
    abilityComponents: AbilityComponent[];
    buttons: any[];
    awaitingUpdate: {
        (a: Ability): any;
    }[];
    constructor(ability?: Ability);
    static getAllAbilities(loginToken: string, characterID: string, callback: (abilities: Ability[]) => void): void;
}
export default Ability;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/classes/Combatant.d.ts
declare module 'camelot-unchained/definitions/core/classes/Combatant' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import race from 'camelot-unchained/definitions/core/constants/race';
import archetype from 'camelot-unchained/definitions/core/constants/archetype';
export interface Injury {
    part: number;
    health: number;
    maxHealth: number;
    wounds: number;
}
class Combatant {
    name: string;
    health: number;
    maxHealth: number;
    stamina: number;
    maxStamina: number;
    injuries: Injury[];
    constructor(combatant?: Combatant);
    /**
     *  Reset combatant state to nil [for when not got a target]
     */
    reset(): void;
    setRace(race: race): void;
    setArchetype(archetype: archetype): void;
    setName(name: string): void;
    setHealth(health: number, maxHealth: number): void;
    setStamina(stamina: number, maxStamina: number): void;
    setInjury(part: number, health: number, maxHealth: number, wounds: number): void;
    static create(): Combatant;
}
export default Combatant;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/classes/Player.d.ts
declare module 'camelot-unchained/definitions/core/classes/Player' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import Combatant from 'camelot-unchained/definitions/core/classes/Combatant';
import race from 'camelot-unchained/definitions/core/constants/race';
import archetype from 'camelot-unchained/definitions/core/constants/archetype';
class Player extends Combatant {
    race: race;
    archetype: archetype;
    constructor(player?: Player);
    setRace(race: race): void;
    setArchetype(archetype: archetype): void;
    static create(): Player;
}
export default Player;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/constants/baneBoonCategory.d.ts
declare module 'camelot-unchained/definitions/core/constants/baneBoonCategory' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
enum baneBoonCategory {
    NONE = -1,
    GENERAL = 1,
    FACTION = 2,
    RACE = 3,
    ARCHETYPE = 4,
}
export default baneBoonCategory;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/classes/BaneBoon.d.ts
declare module 'camelot-unchained/definitions/core/classes/BaneBoon' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import channelId from 'camelot-unchained/definitions/core/constants/channelId';
import baneBoonCategory from 'camelot-unchained/definitions/core/constants/baneBoonCategory';
class BaneBoon {
    id: string;
    channelId: channelId;
    name: string;
    description: string;
    category: baneBoonCategory;
    categoryId: number;
    icon: string;
    costPerRank: number;
    maxRanks: number;
    prerequisite: string;
    x: number;
    y: number;
    constructor(boonbane?: BaneBoon);
    static create(): BaneBoon;
}
export default BaneBoon;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/classes/SpellBook.d.ts
declare module 'camelot-unchained/definitions/core/classes/SpellBook' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import Ability from 'camelot-unchained/definitions/core/classes/Ability';
class SpellBook {
    abilities: Ability[];
    constructor(spellbook?: SpellBook);
    static create(): SpellBook;
}
export default SpellBook;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/classes/Group.d.ts
declare module 'camelot-unchained/definitions/core/classes/Group' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import Player from 'camelot-unchained/definitions/core/classes/Player';
import Character from 'camelot-unchained/definitions/core/classes/Character';
class Group {
    self: Character;
    members: Player[];
    constructor(group?: Group);
    static create(): Group;
}
export default Group;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/classes/Stats.d.ts
declare module 'camelot-unchained/definitions/core/classes/Stats' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http//mozilla.org/MPL/2.0/.
 */
class Stats {
    strength: number;
    agility: number;
    endurance: number;
    will: number;
    resonance: number;
    dexterity: number;
    vitality: number;
    attunement: number;
    faith: number;
    eyesight: number;
    hearing: number;
    clarity: number;
    mass: number;
    presence: number;
    affinity: number;
    maxMoveSpeed: number;
    vision: number;
    detection: number;
    carryCapacity: number;
    maxPanic: number;
    panicDelay: number;
    healthRegeneration: number;
    staminaRegeneration: number;
    constructor(stats?: Stats);
    static create(): Stats;
}
export default Stats;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/classes/Character.d.ts
declare module 'camelot-unchained/definitions/core/classes/Character' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import Player from 'camelot-unchained/definitions/core/classes/Player';
import Inventory from 'camelot-unchained/definitions/core/classes/Inventory';
import EquippedGear from 'camelot-unchained/definitions/core/classes/EquippedGear';
import BaneBoon from 'camelot-unchained/definitions/core/classes/BaneBoon';
import SpellBook from 'camelot-unchained/definitions/core/classes/SpellBook';
import Group from 'camelot-unchained/definitions/core/classes/Group';
import Stats from 'camelot-unchained/definitions/core/classes/Stats';
class Character extends Player {
    inventory: Inventory;
    banes: BaneBoon[];
    boons: BaneBoon[];
    equippedGear: EquippedGear;
    spellBook: SpellBook;
    group: Group;
    stats: Stats;
    constructor(character?: Character);
    static create(): Character;
}
export default Character;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/classes/ControlGame.d.ts
declare module 'camelot-unchained/definitions/core/classes/ControlGame' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
export interface ControlPoint {
    faction: string;
    id: string;
    size: string;
    x: number;
    y: number;
}
class ControlGame {
    arthurianScore: number;
    controlPoints: ControlPoint[];
    gameState: number;
    timeLeft: number;
    tuathaDeDanannScore: number;
    vikingScore: number;
    constructor(controlGame?: ControlGame);
    static create(): ControlGame;
}
export default ControlGame;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/classes/Injury.d.ts
declare module 'camelot-unchained/definitions/core/classes/Injury' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
class Injury {
    part: number;
    health: number;
    maxHealth: number;
    wounds: number;
    empty: boolean;
    constructor(injury?: Injury);
    refresh(injury?: Injury): void;
    static create(): Injury;
}
export default Injury;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/classes/Population.d.ts
declare module 'camelot-unchained/definitions/core/classes/Population' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
class Population {
    arthurians: number;
    tuathaDeDanann: number;
    vikings: number;
    max: number;
    constructor(population?: Population);
    static create(): Population;
}
export default Population;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/classes/Inventory.d.ts
declare module 'camelot-unchained/definitions/core/classes/Inventory' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import Item from 'camelot-unchained/definitions/core/classes/Item';
/**
 * Inventory
 */
class Inventory {
    /**
     * The items currently in the inventory
     * @type {Item[]}
     */
    items: Item[];
    /**
     * Inventory Constructor
     * @param  {Inventory = <Inventory>{}} inventory - provide an existing inventory to copy all items into new inventory
     */
    constructor(inventory?: Inventory);
    /**
     * Check if the inventory contains an item
     * @param  {string} id - the id of item to look for
     * @return {boolean} returns true if the item existing in the inventory
     */
    hasItem(id: string): boolean;
    /**
     * Adds an item to the inventory
     * @param {Item} item - the item to add to inventory
     */
    addItem(item: Item): void;
    /**
     * Removes an item from the inventory with the given item id
     * @param {string} id - the item id to remove
     */
    removeItem(id: string): void;
    /**
     * Get a list of all item ID's currently in the inventory
     * @return {string[]} an array of item ID's
     */
    getItemIDs(): string[];
    static create(): Inventory;
}
export default Inventory;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/classes/Item.d.ts
declare module 'camelot-unchained/definitions/core/classes/Item' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import itemType from 'camelot-unchained/definitions/core/constants/itemType';
import gearSlot from 'camelot-unchained/definitions/core/constants/gearSlot';
/**
 * Item
 */
class Item {
    /**
     * The item ID
     * @type {string}
     */
    id: string;
    /**
     * The item Type
     * @type {itemType}
     */
    type: itemType;
    /**
     * The Item Name
     * @type {string}
     */
    name: string;
    /**
     * The Item Description
     * @type {string}
     */
    description: string;
    /**
     * The Item Resource ID
     * @type {number}
     */
    resourceID: number;
    /**
     * The Item carryingRequirement
     * @type {any}
     */
    carryingRequirement: any;
    /**
     * The Item gearSlot
     * @type {gearSlot}
     */
    gearSlot: gearSlot;
    /**
     * Item Constructor
     * @param  {Item = <Item>{}} item - an existing item to create this new item from
     */
    constructor(item?: Item);
    static create(): Item;
}
export default Item;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/classes/EquippedGear.d.ts
declare module 'camelot-unchained/definitions/core/classes/EquippedGear' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import Item from 'camelot-unchained/definitions/core/classes/Item';
import gearSlot from 'camelot-unchained/definitions/core/constants/gearSlot';
/**
 * EquippedGear
 */
class EquippedGear {
    /**
     * The items currently in the equippedgear
     * @type {Item[]}
     */
    items: Item[];
    constructor(equippedgear?: EquippedGear);
    /**
     * Get the item in specific gear slot
     * @param  {gearSlot} slot - the gear slot to get item for
     * @return {Item} the item in gear slot, or null if there is no item equipped
     */
    getItemInGearSlot(slot: gearSlot | string): Item;
    /**
     * Check if the equippedgear contains an item
     * @param  {string} id - the id of item to look for
     * @return {boolean} returns true if the item existing in the equippedgear
     */
    hasItem(id: string): boolean;
    /**
     * Removes an item from given gear slot
     * @param {gearSlot} slot the gear slot to remove item from
     */
    removeItemInGearSlot(slot: gearSlot): void;
    /**
     * Adds an item to the equippedgear
     * @param {Item} item - the item to add to equippedgear
     */
    addItem(item: Item): void;
    /**
     * Removes an item from the equippedgear with the given item id
     * @param {string} id - the item id to remove
     */
    removeItem(id: string): void;
    /**
     * Get a list of all item ID's currently in the equippedgear
     * @return {string[]} an array of item ID's
     */
    getItemIDs(): string[];
    static create(): EquippedGear;
}
export default EquippedGear;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/classes/LogMessage.d.ts
declare module 'camelot-unchained/definitions/core/classes/LogMessage' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
class LogMessage {
    category: string;
    level: number;
    time: string;
    process: number;
    thread: number;
    message: string;
    constructor(logMessage?: LogMessage);
    static create(): LogMessage;
}
export default LogMessage;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/classes/ChatMessage.d.ts
declare module 'camelot-unchained/definitions/core/classes/ChatMessage' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
class ChatMessage {
    type: number;
    from: string;
    body: string;
    nick: string;
    iscse: boolean;
    constructor(chatMessage?: ChatMessage);
    static create(): ChatMessage;
}
export default ChatMessage;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/classes/ConsoleMessage.d.ts
declare module 'camelot-unchained/definitions/core/classes/ConsoleMessage' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
class ConsoleMessage {
    text: string;
    constructor(consoleMessage?: ConsoleMessage);
    static create(): ConsoleMessage;
}
export default ConsoleMessage;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/constants/announcementType.d.ts
declare module 'camelot-unchained/definitions/core/constants/announcementType' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
enum announcementType {
    TEXT = 1,
    POPUP = 2,
    ALL = 3,
}
export default announcementType;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/config/configCategory.d.ts
declare module 'camelot-unchained/definitions/core/config/configCategory' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
/**
 * These are needed by the C++ Layer to know which build variables
 * to send to the window.
 */
enum configCategory {
    KEYBIND_MOVEMENT = 0,
    KEYBIND_COMBAT = 1,
    KEYBIND_BUILDING = 3,
    KEYBIND_INTERFACE = 4,
    KEYBIND_UTILITY = 5,
    AUDIO_PRIMARY = 6,
    VIDEO_PRIMARY = 7,
    GAME_PRIMARY = 8,
}
export default configCategory;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/config/ConfigVar.d.ts
declare module 'camelot-unchained/definitions/core/config/ConfigVar' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import configCategory from 'camelot-unchained/definitions/core/config/configCategory';
class ConfigVar {
    id: number;
    category: configCategory;
    description: string;
    value: any;
    constructor(config?: ConfigVar);
    create(): ConfigVar;
}
export default ConfigVar;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/config/dxKeyCodes.d.ts
declare module 'camelot-unchained/definitions/core/config/dxKeyCodes' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
enum dxKeyCodes {
    'ESCAPE' = 1,
    ' 1 ' = 2,
    ' 2 ' = 3,
    ' 3 ' = 4,
    ' 4 ' = 5,
    ' 5 ' = 6,
    ' 6 ' = 7,
    ' 7 ' = 8,
    ' 8 ' = 9,
    ' 9 ' = 10,
    ' 0 ' = 11,
    '-' = 12,
    '=' = 13,
    'BACKSPACE' = 14,
    'TAB' = 15,
    'Q' = 16,
    'W' = 17,
    'E' = 18,
    'R' = 19,
    'T' = 20,
    'Y' = 21,
    'U' = 22,
    'I' = 23,
    'O' = 24,
    'P' = 25,
    '[' = 26,
    ']' = 27,
    'RETURN' = 28,
    ' CONTROL' = 29,
    'A' = 30,
    'S' = 31,
    'D' = 32,
    'F' = 33,
    'G' = 34,
    'H' = 35,
    'J' = 36,
    'K' = 37,
    'L' = 38,
    ';' = 39,
    ' \' ' = 40,
    '`' = 41,
    'SHIFT' = 42,
    '\\' = 43,
    'Z' = 44,
    'X' = 45,
    'C' = 46,
    'V' = 47,
    'B' = 48,
    'N' = 49,
    'M' = 50,
    ',' = 51,
    '.' = 52,
    '/' = 53,
    ' SHIFT' = 54,
    '*' = 55,
    ' ALT' = 56,
    'SPACE' = 57,
    'CAPSLCK' = 58,
    'F1' = 59,
    'F2' = 60,
    'F3' = 61,
    'F4' = 62,
    'F5' = 63,
    'F6' = 64,
    'F7' = 65,
    'F8' = 66,
    'F9' = 67,
    'F10' = 68,
    'NUMLCK' = 69,
    'SCRLCK' = 70,
    'NUM7' = 71,
    'NUM8' = 72,
    'NUM9' = 73,
    'NUM-' = 74,
    'NUM4' = 75,
    'NUM5' = 76,
    'NUM6' = 77,
    'NUM+' = 78,
    'NUM1' = 79,
    'NUM2' = 80,
    'NUM3' = 81,
    'NUM0' = 82,
    'NUM.' = 83,
    'OEM_102' = 86,
    'F11' = 87,
    'F12' = 88,
    'F13' = 100,
    'F14' = 101,
    'F15' = 102,
    'KANA' = 112,
    'ABNT_C1' = 115,
    'CONVERT' = 121,
    'NOCONVERT' = 123,
    'YEN' = 125,
    'ABNT_C2' = 126,
    'NUM=' = 141,
    'PREVTRK' = 144,
    '@' = 145,
    ':' = 146,
    '_' = 147,
    'KANJI' = 148,
    'STOP' = 149,
    'AX' = 150,
    'UNLABELED' = 151,
    'NEXTTRK' = 153,
    'NUMENTER' = 156,
    'CONTROL' = 157,
    'MUTE' = 160,
    'CALC' = 161,
    'PLAYE' = 162,
    ' STOP' = 164,
    'VOLDN' = 174,
    'VOLUP' = 176,
    'HOME' = 178,
    'NUM,' = 179,
    'NUM/' = 181,
    'SYSRQ' = 183,
    'RALT' = 184,
    'PAUSE' = 197,
    'HOME ' = 199,
    'UP' = 200,
    'PAGEUP' = 201,
    'LEFT' = 203,
    'RIGHT' = 205,
    'END' = 207,
    'DOWN' = 208,
    'PAGEDN' = 209,
    'INSERT' = 210,
    'DELETE' = 211,
    'LWIN' = 219,
    'RWIN' = 220,
    'APPS' = 221,
    'POWER' = 222,
    'SLEEP' = 223,
    'WAKE' = 227,
    'SEARCH' = 229,
    'WEBFAV' = 230,
    'REFRESH' = 231,
    'WEBSTOP' = 232,
    'WEBFWD' = 233,
    'WEBBCK' = 234,
    'MYCMPTR' = 235,
    'MAIL' = 236,
    'MEDIASLCT' = 237,
}
export default dxKeyCodes;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/config/jsKeyCodes.d.ts
declare module 'camelot-unchained/definitions/core/config/jsKeyCodes' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
enum jsKeyCodes {
    'BACKSPACE' = 8,
    'TAB' = 9,
    'ENTER' = 13,
    'SHIFT' = 16,
    'CTRL' = 17,
    'ALT' = 18,
    'PAUSE/BREAK' = 19,
    'CAPSLOCK' = 20,
    'ESC' = 27,
    'SPACE' = 32,
    'PAGEUP' = 33,
    'PAGEDOWN' = 34,
    'END' = 35,
    'HOME' = 36,
    'LEFT' = 37,
    'UP' = 38,
    'RIGHT' = 39,
    'DOWN' = 40,
    'INSERT' = 45,
    'DELETE' = 46,
    'ZERO' = 48,
    'ONE' = 49,
    'TWO' = 50,
    'THREE' = 51,
    'FOUR' = 52,
    'FIVE' = 53,
    'SIX' = 54,
    'SEVEN' = 55,
    'EIGHT' = 56,
    'NINE' = 57,
    'A' = 65,
    'B' = 66,
    'C' = 67,
    'D' = 68,
    'E' = 69,
    'F' = 70,
    'G' = 71,
    'H' = 72,
    'I' = 73,
    'J' = 74,
    'K' = 75,
    'L' = 76,
    'M' = 77,
    'N' = 78,
    'O' = 79,
    'P' = 80,
    'Q' = 81,
    'R' = 82,
    'S' = 83,
    'T' = 84,
    'U' = 85,
    'V' = 86,
    'W' = 87,
    'X' = 88,
    'Y' = 89,
    'Z' = 90,
    'WINDOWS' = 91,
    'RIGHTCLICK' = 93,
    'NUMPAD0' = 96,
    'NUMPAD1' = 97,
    'NUMPAD2' = 98,
    'NUMPAD3' = 99,
    'NUMPAD4' = 100,
    'NUMPAD5' = 101,
    'NUMPAD6' = 102,
    'NUMPAD7' = 103,
    'NUMPAD8' = 104,
    'NUMPAD9' = 105,
    'NUMPAD*' = 106,
    'NUMPAD+' = 107,
    'NUMPAD-' = 109,
    'NUMPAD.' = 110,
    'NUMPAD/' = 111,
    'F1' = 112,
    'F2' = 113,
    'F3' = 114,
    'F4' = 115,
    'F5' = 116,
    'F6' = 117,
    'F7' = 118,
    'F8' = 119,
    'F9' = 120,
    'F10' = 121,
    'F11' = 122,
    'F12' = 123,
    'NUMLOCK' = 144,
    'SCROLLLOCK' = 145,
    'MYCOMPUTER' = 182,
    'MYCALCULATOR' = 183,
    ';' = 186,
    '=' = 187,
    ',' = 188,
    '-' = 189,
    '.' = 190,
    '/' = 191,
    '`' = 192,
    '[' = 219,
    '\\' = 220,
    ']' = 221,
    '\'' = 222,
}
export default jsKeyCodes;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/config/jsToDXKeyCodeMap.d.ts
declare module 'camelot-unchained/definitions/core/config/jsToDXKeyCodeMap' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
const jsToDXKeyCodeMap: {
    8: number;
    9: number;
    13: number;
    16: number;
    17: number;
    18: number;
    19: number;
    20: number;
    27: number;
    32: number;
    33: number;
    34: number;
    35: number;
    36: number;
    37: number;
    38: number;
    39: number;
    40: number;
    45: number;
    46: number;
    48: number;
    49: number;
    50: number;
    51: number;
    52: number;
    53: number;
    54: number;
    55: number;
    56: number;
    57: number;
    65: number;
    66: number;
    67: number;
    68: number;
    69: number;
    70: number;
    71: number;
    72: number;
    73: number;
    74: number;
    75: number;
    76: number;
    77: number;
    78: number;
    79: number;
    80: number;
    81: number;
    82: number;
    83: number;
    84: number;
    85: number;
    86: number;
    87: number;
    88: number;
    89: number;
    90: number;
    91: number;
    92: number;
    96: number;
    97: number;
    98: number;
    99: number;
    100: number;
    101: number;
    102: number;
    103: number;
    104: number;
    105: number;
    106: number;
    107: number;
    109: number;
    110: number;
    111: number;
    112: number;
    113: number;
    114: number;
    115: number;
    116: number;
    117: number;
    118: number;
    119: number;
    120: number;
    121: number;
    122: number;
    123: number;
    144: number;
    145: number;
    0xA6: number;
    0xA7: number;
    0xA8: number;
    0xA9: number;
    0xAA: number;
    0xAB: number;
    0xAC: number;
    0xAD: number;
    0xAE: number;
    0xAF: number;
    0xB0: number;
    0xB1: number;
    0xB2: number;
    0xB3: number;
    0xB4: number;
    0xB5: number;
    186: number;
    187: number;
    188: number;
    189: number;
    190: number;
    191: number;
    192: number;
    219: number;
    220: number;
    221: number;
    222: number;
};
export default jsToDXKeyCodeMap;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/config/KeyBind.d.ts
declare module 'camelot-unchained/definitions/core/config/KeyBind' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import keyboardModifier from 'camelot-unchained/definitions/core/config/keyboardModifier';
class KeyBind {
    primaryKeyCode: number;
    primaryModifiers: keyboardModifier;
    secondaryKeyCode: number;
    secondaryModifiers: keyboardModifier;
    default: number;
    defaultModifiers: keyboardModifier;
    primaryToString: () => string;
    secondaryToString: () => string;
}
export default KeyBind;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/config/KeyBindConfigVar.d.ts
declare module 'camelot-unchained/definitions/core/config/KeyBindConfigVar' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import ConfigVar from 'camelot-unchained/definitions/core/config/ConfigVar';
import KeyBind from 'camelot-unchained/definitions/core/config/KeyBind';
class KeyBindConfigVar extends ConfigVar {
    _value: KeyBind;
    value: KeyBind;
    constructor(config?: KeyBindConfigVar);
    create(): KeyBindConfigVar;
}
export default KeyBindConfigVar;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/config/keyboardModifier.d.ts
declare module 'camelot-unchained/definitions/core/config/keyboardModifier' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
enum keyboardModifier {
    NONE = 0,
    CTRL = 1,
    ALT = 2,
    SHIFT = 4,
}
export default keyboardModifier;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/config/AudioConfigVar.d.ts
declare module 'camelot-unchained/definitions/core/config/AudioConfigVar' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import ConfigVar from 'camelot-unchained/definitions/core/config/ConfigVar';
import { AudioSetting } from 'camelot-unchained/definitions/core/config/AudioSetting';
class AudioConfigVar extends ConfigVar {
    _value: AudioSetting;
    value: AudioSetting;
    constructor(config?: AudioConfigVar);
    create(): AudioConfigVar;
}
export default AudioConfigVar;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/config/AudioSetting.d.ts
declare module 'camelot-unchained/definitions/core/config/AudioSetting' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
export enum AudioSettingType {
    RANGE = 0,
    BOOL = 1,
}
export class AudioSetting {
    type: AudioSettingType;
    default: any;
    value: any;
    min: any;
    max: any;
}
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/config/config.d.ts
declare module 'camelot-unchained/definitions/core/config/config' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import configCategory from 'camelot-unchained/definitions/core/config/configCategory';
import configGroup from 'camelot-unchained/definitions/core/config/configGroup';
import ConfigVar from 'camelot-unchained/definitions/core/config/ConfigVar';
import dxKeyCodes from 'camelot-unchained/definitions/core/config/dxKeyCodes';
import jsKeyCodes from 'camelot-unchained/definitions/core/config/jsKeyCodes';
import jsToDXKeyCodeMap from 'camelot-unchained/definitions/core/config/jsToDXKeyCodeMap';
import KeyBind from 'camelot-unchained/definitions/core/config/KeyBind';
import KeyBindConfigVar from 'camelot-unchained/definitions/core/config/KeyBindConfigVar';
import keyboardModifier from 'camelot-unchained/definitions/core/config/keyboardModifier';
import AudioConfigVar from 'camelot-unchained/definitions/core/config/AudioConfigVar';
export * from 'camelot-unchained/definitions/core/config/AudioSetting';
export { configCategory, configGroup, ConfigVar, dxKeyCodes, jsKeyCodes, jsToDXKeyCodeMap, KeyBind, KeyBindConfigVar, keyboardModifier, AudioConfigVar };
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/classes/Announcement.d.ts
declare module 'camelot-unchained/definitions/core/classes/Announcement' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import announcementType from 'camelot-unchained/definitions/core/constants/announcementType';
class Announcement {
    message: string;
    type: announcementType;
    constructor(message?: string, type?: announcementType);
}
export default Announcement;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/core/core.d.ts
declare module 'camelot-unchained/definitions/core/core' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import CoreSettings from 'camelot-unchained/definitions/core/CoreSettings';
import clientInterface from 'camelot-unchained/definitions/core/clientInterface';
import client from 'camelot-unchained/definitions/core/client';
import abilityTags from 'camelot-unchained/definitions/core/constants/abilityConstants/abilityTags';
import announcementType from 'camelot-unchained/definitions/core/constants/announcementType';
import archetype from 'camelot-unchained/definitions/core/constants/archetype';
import buildUIMode from 'camelot-unchained/definitions/core/constants/buildUIMode';
import channelId from 'camelot-unchained/definitions/core/constants/channelId';
import emotes from 'camelot-unchained/definitions/core/constants/emotes';
import race from 'camelot-unchained/definitions/core/constants/race';
import soundEvents from 'camelot-unchained/definitions/core/constants/soundEvents';
import tagConstraintType from 'camelot-unchained/definitions/core/constants/tagConstraintType';
import itemType from 'camelot-unchained/definitions/core/constants/itemType';
import gearSlot from 'camelot-unchained/definitions/core/constants/gearSlot';
export * from 'camelot-unchained/definitions/core/config/config';
import Ability from 'camelot-unchained/definitions/core/classes/Ability';
import Announcement from 'camelot-unchained/definitions/core/classes/Announcement';
import Combatant from 'camelot-unchained/definitions/core/classes/Combatant';
import Player from 'camelot-unchained/definitions/core/classes/Player';
import Character from 'camelot-unchained/definitions/core/classes/Character';
import ControlGame from 'camelot-unchained/definitions/core/classes/ControlGame';
import Injury from 'camelot-unchained/definitions/core/classes/Injury';
import Population from 'camelot-unchained/definitions/core/classes/Population';
import Inventory from 'camelot-unchained/definitions/core/classes/Inventory';
import Item from 'camelot-unchained/definitions/core/classes/Item';
import EquippedGear from 'camelot-unchained/definitions/core/classes/EquippedGear';
import LogMessage from 'camelot-unchained/definitions/core/classes/LogMessage';
import ChatMessage from 'camelot-unchained/definitions/core/classes/ChatMessage';
import ConsoleMessage from 'camelot-unchained/definitions/core/classes/ConsoleMessage';
export { CoreSettings, clientInterface, client, abilityTags, announcementType, archetype, buildUIMode, channelId, emotes, race, soundEvents, tagConstraintType, itemType, gearSlot, Ability, Announcement, Combatant, Player, Character, ControlGame, Injury, Population, Inventory, Item, EquippedGear, LogMessage, ChatMessage, ConsoleMessage };
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/events/classes/HandlesAnnouncements.d.ts
declare module 'camelot-unchained/definitions/events/classes/HandlesAnnouncements' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
export default class HandlesAnnouncements {
    topic: string;
}
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/events/classes/HandlesBeginChat.d.ts
declare module 'camelot-unchained/definitions/events/classes/HandlesBeginChat' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
export default class HandlesBeginChat {
    topic: string;
}
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/events/classes/HandlesChat.d.ts
declare module 'camelot-unchained/definitions/events/classes/HandlesChat' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
export default class HandlesChat {
    topic: string;
}
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/events/classes/HandlesCharacter.d.ts
declare module 'camelot-unchained/definitions/events/classes/HandlesCharacter' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
export default class HandlesCharacter {
    topic: string;
}
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/events/classes/HandlesEnemyTarget.d.ts
declare module 'camelot-unchained/definitions/events/classes/HandlesEnemyTarget' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
export default class HandlesEnemyTarget {
    topic: string;
}
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/events/classes/HandlesFriendlyTarget.d.ts
declare module 'camelot-unchained/definitions/events/classes/HandlesFriendlyTarget' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
export default class HandlesFriendlyTarget {
    topic: string;
}
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/events/classes/HandlesControlGame.d.ts
declare module 'camelot-unchained/definitions/events/classes/HandlesControlGame' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
export default class HandlesControlGame {
    topic: string;
}
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/events/classes/HandlesControlGameScore.d.ts
declare module 'camelot-unchained/definitions/events/classes/HandlesControlGameScore' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
export default class HandlesControlGameScore {
    topic: string;
}
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/events/classes/HandlesInventory.d.ts
declare module 'camelot-unchained/definitions/events/classes/HandlesInventory' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
export default class HandlesInventory {
    topic: string;
}
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/events/classes/HandlesEquippedGear.d.ts
declare module 'camelot-unchained/definitions/events/classes/HandlesEquippedGear' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
export default class HandlesEquippedGear {
    topic: string;
}
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/events/classes/HandlesConsole.d.ts
declare module 'camelot-unchained/definitions/events/classes/HandlesConsole' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
export default class HandlesConsole {
    topic: string;
}
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/events/classes/HandlesLogging.d.ts
declare module 'camelot-unchained/definitions/events/classes/HandlesLogging' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
export default class HandlesLogging {
    topic: string;
}
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/events/events.d.ts
declare module 'camelot-unchained/definitions/events/events' {
import HandlesAnnouncements from 'camelot-unchained/definitions/events/classes/HandlesAnnouncements';
import HandlesBeginChat from 'camelot-unchained/definitions/events/classes/HandlesBeginChat';
import HandlesChat from 'camelot-unchained/definitions/events/classes/HandlesChat';
import HandlesCharacter from 'camelot-unchained/definitions/events/classes/HandlesCharacter';
import HandlesEnemyTarget from 'camelot-unchained/definitions/events/classes/HandlesEnemyTarget';
import HandlesFriendlyTarget from 'camelot-unchained/definitions/events/classes/HandlesFriendlyTarget';
import HandlesControlGame from 'camelot-unchained/definitions/events/classes/HandlesControlGame';
import HandlesControlGameScore from 'camelot-unchained/definitions/events/classes/HandlesControlGameScore';
import HandlesInventory from 'camelot-unchained/definitions/events/classes/HandlesInventory';
import HandlesEquippedGear from 'camelot-unchained/definitions/events/classes/HandlesEquippedGear';
import HandlesConsole from 'camelot-unchained/definitions/events/classes/HandlesConsole';
import HandlesLogging from 'camelot-unchained/definitions/events/classes/HandlesLogging';
var _default: {
    handlesAnnouncements: HandlesAnnouncements;
    handlesBeginChat: HandlesBeginChat;
    handlesChat: HandlesChat;
    handlesCharacter: HandlesCharacter;
    handlesEnemyTarget: HandlesEnemyTarget;
    handlesFriendlyTarget: HandlesFriendlyTarget;
    handlesControlGame: HandlesControlGame;
    handlesControlGameScore: HandlesControlGameScore;
    handlesInventory: HandlesInventory;
    handlesEquippedGear: HandlesEquippedGear;
    handlesConsole: HandlesConsole;
    handlesLogging: HandlesLogging;
    on: (topic: string, callback: (info: any) => void) => any;
    off: (listener: any) => void;
    addListener: (topic: string, callback: (info: any) => void) => void;
    removeListener: (listener: any) => void;
};
export default _default;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/components/woundframe/WoundFrame.d.ts
declare module 'camelot-unchained/definitions/components/woundframe/WoundFrame' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import * as React from 'react';
export class WoundsProps {
    name: string;
    injuries: any[];
    health: number;
    healthMax: number;
    stamina: number;
    staminaMax: number;
    panic: number;
    panicMax: number;
    temp: number;
    tempMax: number;
}
export class WoundsState {
}
class WoundFrame extends React.Component<WoundsProps, WoundsState> {
    constructor(props: WoundsProps);
    render(): JSX.Element;
}
export default WoundFrame;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/components/quickselect/QuickSelect.d.ts
declare module 'camelot-unchained/definitions/components/quickselect/QuickSelect' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
/**
 * Materialize dropdown inspired quickselect list.
 *
 * *requires materialize js & css to be included on your html page.
 *
 * USAGE:
 *
 * class MyQuickSelect extends React.Component<any, any> {
 *   generateActiveView = (item: any) => {
 *     return <div>{item.foo}</div>;
 *   }
 *   generateListView = (item: any) => {
 *     return <div>{item.foo}</div>;
 *   }
 *   onSelectedItemChanged = (item: any) => {
 *     console.log('selected item is ' + item.foo);
 *   }
 *   render() {
 *     let items = [{foo:'Hello'},{foo:'World'}];
 *     return <QuickSelect items={items} activeViewComponentGenerator={this.generateActiveView}
          listViewComponentGenerator={this.generateListView} onSelectedItemChanged={this.onSelectedChannelChanged} />;
 *   }
 * }
 *
 */
import * as React from 'react';
export interface QuickSelectProps {
    items: Array<any>;
    activeViewComponentGenerator: (item: any) => any;
    listViewComponentGenerator: (item: any) => any;
    onSelectedItemChanged: (item: any) => void;
}
export interface QuickSelectState {
    selectedIndex: number;
}
class QuickSelect extends React.Component<QuickSelectProps, QuickSelectState> {
    private static idCounter;
    private uniqueId;
    constructor(props: QuickSelectProps);
    onItemSelect: (item: any, itemIndex: number) => void;
    buildListItem: (item: any, itemIndex: number) => JSX.Element;
    render(): JSX.Element;
}
export default QuickSelect;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/components/Animate.d.ts
declare module 'camelot-unchained/definitions/components/Animate' {
import * as React from 'react';
class Animate extends React.Component<any, any> {
    constructor(props: any);
    static propTypes: {
        animationEnter: React.Validator<any>;
        animationLeave: React.Validator<any>;
        durationEnter: React.Validator<any>;
        durationLeave: React.Validator<any>;
    };
    renderStyle: (animationEnter: string, animationLeave: string, durationEnter: number, durationLeave: number) => string;
    render(): JSX.Element;
}
export default Animate;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/components/components.d.ts
declare module 'camelot-unchained/definitions/components/components' {
import WoundFrame from 'camelot-unchained/definitions/components/woundframe/WoundFrame';
import QuickSelect from 'camelot-unchained/definitions/components/quickselect/QuickSelect';
import Animate from 'camelot-unchained/definitions/components/Animate';
var _default: {
    UnitFrame: __React.ClassicComponentClass<any>;
    Effects: __React.ClassicComponentClass<any>;
    HealthBar: __React.ClassicComponentClass<any>;
    HealthText: __React.ClassicComponentClass<any>;
    Name: __React.ClassicComponentClass<any>;
    Portrait: __React.ClassicComponentClass<any>;
    StaminaBar: __React.ClassicComponentClass<any>;
    StaminaText: __React.ClassicComponentClass<any>;
    Injuries: __React.ClassicComponentClass<any>;
    Injury: __React.ClassicComponentClass<any>;
    InjuryLocation: __React.ClassicComponentClass<any>;
    InjuryBar: __React.ClassicComponentClass<any>;
    InjuryText: __React.ClassicComponentClass<any>;
    InjuryWounds: __React.ClassicComponentClass<any>;
    WoundFrame: typeof WoundFrame;
    QuickSelect: typeof QuickSelect;
    Animate: typeof Animate;
};
export default _default;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/codecorsair/camelot-unchained-client-library/typings/definitions/index.d.ts
declare module 'camelot-unchained/definitions/index' {
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import CoreSettings from 'camelot-unchained/definitions/core/CoreSettings';
import clientInterface from 'camelot-unchained/definitions/core/clientInterface';
import client from 'camelot-unchained/definitions/core/client';
import abilityTags from 'camelot-unchained/definitions/core/constants/abilityConstants/abilityTags';
import archetype from 'camelot-unchained/definitions/core/constants/archetype';
import buildUIMode from 'camelot-unchained/definitions/core/constants/buildUIMode';
import channelId from 'camelot-unchained/definitions/core/constants/channelId';
import emotes from 'camelot-unchained/definitions/core/constants/emotes';
import race from 'camelot-unchained/definitions/core/constants/race';
import soundEvents from 'camelot-unchained/definitions/core/constants/soundEvents';
import tagConstraintType from 'camelot-unchained/definitions/core/constants/tagConstraintType';
import itemType from 'camelot-unchained/definitions/core/constants/itemType';
import gearSlot from 'camelot-unchained/definitions/core/constants/gearSlot';
import Ability from 'camelot-unchained/definitions/core/classes/Ability';
import Combatant from 'camelot-unchained/definitions/core/classes/Combatant';
import Player from 'camelot-unchained/definitions/core/classes/Player';
import Character from 'camelot-unchained/definitions/core/classes/Character';
import ControlGame from 'camelot-unchained/definitions/core/classes/ControlGame';
import Injury from 'camelot-unchained/definitions/core/classes/Injury';
import Population from 'camelot-unchained/definitions/core/classes/Population';
import Inventory from 'camelot-unchained/definitions/core/classes/Inventory';
import Item from 'camelot-unchained/definitions/core/classes/Item';
import EquippedGear from 'camelot-unchained/definitions/core/classes/EquippedGear';
import LogMessage from 'camelot-unchained/definitions/core/classes/LogMessage';
import ChatMessage from 'camelot-unchained/definitions/core/classes/ChatMessage';
import ConsoleMessage from 'camelot-unchained/definitions/core/classes/ConsoleMessage';
import * as core from 'camelot-unchained/definitions/core/core';
import events from 'camelot-unchained/definitions/events/events';
import components from 'camelot-unchained/definitions/components/components';
export { CoreSettings, clientInterface, client, abilityTags, archetype, buildUIMode, channelId, emotes, race, soundEvents, tagConstraintType, itemType, gearSlot, Ability, Combatant, Player, Character, ControlGame, Injury, Population, Inventory, Item, EquippedGear, LogMessage, ChatMessage, ConsoleMessage, core, events, components };
}
declare module 'camelot-unchained' {
export * from 'camelot-unchained/definitions/index';
}