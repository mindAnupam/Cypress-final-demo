class ConfigPage {
  // Locators for the Configuration tab
  static configurationTab = ".configuration-tab";
  static settingsSubMenu = ".settings-sub-menu";
  static generalSettingsSubMenu = ".general-settings-sub-menu";
  static onOffSwitchInner = ".onoffswitch-inner";
  static onOffSwitch = ".onoffswitch";
  static uploadedImage = ".uploaded-image>img";
  static fileInput = "input[type=file]";
  static removeButton = ".btn-danger";
  static euCookieLawCheckbox =
    "#StoreInformationSettings_DisplayEuCookieLawWarning";
  static systemEmailCheckbox =
    "#StoreInformationSettings_UseSystemEmailForContactUsForm";
  static searchPlusIcon = ".fa-search-plus";
  static wwwRequirementDropdown = "#SeoSettings_WwwRequirement";
}

export default ConfigPage;
