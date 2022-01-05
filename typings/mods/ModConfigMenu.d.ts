declare const ModConfigMenu: ModConfigMenuInterface | undefined;

/** @noSelf */
declare interface ModConfigMenuInterface {
  Version: int;

  AddSetting(
    categoryName: string,
    subcategoryName?: string,
    setting?: ModConfigMenuSetting,
  ): void;

  AddBooleanSetting(
    categoryName: string,
    subcategoryName: string,
    attribute: string,
    defaultValue: boolean,
    displayText: string,
    displayValueProxies: LuaTable<boolean, string>,
    info: string,
    color?: string,
  ): void;

  AddNumberSetting(
    categoryName: string,
    subcategoryName: string,
    attribute: string,
    minValue: number,
    maxValue: number,
    modifyBy: number,
    defaultValue: number,
    displayText: string,
    displayValueProxies: LuaTable<number, string>,
    info: string,
    color?: string,
  ): void;

  AddScrollSetting(
    categoryName: string,
    subcategoryName: string,
    attribute: string,
    defaultValue: number,
    displayText: string,
    info: string,
    color?: string,
  ): void;

  AddKeyboardSetting(
    categoryName: string,
    subcategoryName: string,
    attribute: string,
    defaultValue: Keyboard,
    displayText: string,
    displayDevice: boolean,
    info: string,
    color?: string,
  ): void;

  AddControllerSetting(
    categoryName: string,
    subcategoryName: string,
    attribute: string,
    defaultValue: Controller,
    displayText: string,
    displayDevice: boolean,
    info: string,
    color?: string,
  ): void;

  SimpleAddSetting(
    settingType: ModConfigMenuOptionType,
    categoryName: string,
    subcategoryName: string,
    attribute: string,
    minValue: number,
    maxValue: number,
    modifyBy: number,
    defaultValue: any,
    displayText: string,
    displayValueProxies: LuaTable<any, string>,
    displayDevice: boolean,
    info: string,
    color?: string,
    functionName?: string,
  ): void;

  RemoveSetting(
    categoryName: string,
    subcategoryString: string,
    settingAttribute: string,
  ): void;

  AddSpace(categoryName: string, subcategoryName: string): void;

  AddText(
    categoryName: string,
    subcategoryName: string,
    text: string | (() => string),
    color?: string,
  ): void;

  AddTitle(
    categoryName: string,
    subcategoryName: string,
    text: string,
    color?: string,
  ): void;

  GetCategoryIDByName(categoryName: string): int | undefined;

  UpdateCategory(categoryName: string, categoryData: CategoryData): void;

  SetCategoryInfo(categoryName: string, info: string): void;

  RemoveCategory(categoryName: string): void;

  GetSubcategoryIDByName(
    category: string | number,
    subcategoryName: string,
  ): int;

  UpdateSubcategory(
    categoryName: string,
    subcategoryName: string,
    subcategoryData: SubcategoryData,
  ): void;

  RemoveSubcategory(categoryName: string, subcategoryName: string): void;

  Config: {
    General: {
      HudOffset: int;
    };
    LastBackPressed: Keyboard | Controller;
  };

  IsVisible: boolean;

  /**
   * MenuData is not normally supposed to be accessed, but we access it to wipe data during a mod
   * reload.
   */
  MenuData: LuaTable<int, MenuData>;

  PopupGfx: {
    /* eslint-disable @typescript-eslint/member-ordering */
    THIN_SMALL: "gfx/ui/modconfig/popup_thin_small.png";
    THIN_MEDIUM: "gfx/ui/modconfig/popup_thin_medium.png";
    THIN_LARGE: "gfx/ui/modconfig/popup_thin_large.png";
    WIDE_SMALL: "gfx/ui/modconfig/popup_wide_small.png";
    WIDE_MEDIUM: "gfx/ui/modconfig/popup_wide_medium.png";
    WIDE_LARGE: "gfx/ui/modconfig/popup_wide_large.png";
    /* eslint-enable @typescript-eslint/member-ordering */
  };
}

/** @noSelf */
declare interface ModConfigMenuSetting {
  CurrentSetting: () => number | boolean;
  Display: () => string;
  Info: string[];
  Maximum?: number;
  Minimum?: number;
  ModifyBy?: number;

  /** This will be undefined if the user canceled the popup dialog. */
  OnChange: (newValue: number | boolean | undefined) => void;

  Popup?: () => void;
  PopupGfx?: string;
  PopupWidth?: int;
  Type: ModConfigMenuOptionType;
}

declare const enum ModConfigMenuOptionType {
  TEXT = 1,
  SPACE = 2,
  SCROLL = 3,
  BOOLEAN = 4,
  NUMBER = 5,
  KEYBIND_KEYBOARD = 6,
  KEYBIND_CONTROLLER = 7,
  TITLE = 8,
}

declare interface CategoryData {
  Name: string;
  Info: string;
  IsOld: boolean;
}

declare interface SubcategoryData {
  Name: string;
  Info: string;
}

declare interface MenuData {
  Name: string;
  Subcategories: string[];
}
