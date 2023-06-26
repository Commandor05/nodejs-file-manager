class AppConfig {
  configuration = {};

  appControllerConfiguration = {};

  /**
   * Add Controller For Operatins
   *
   * @param {conntroller instance} controller
   * @param {array} operations
   */
  addControllerForOperatins(controller, operations) {
    for (let operation of operations) {
      this.appControllerConfiguration[operation] = controller;
    }
  }

  getAppControlerConfiguration() {
    return this.appControllerConfiguration;
  }
}

export const appConfig = new AppConfig();
