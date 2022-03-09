const { Plugin } = require("discord-trolling");
const { MyCatLikesFirebaseServer } = require("my-cat-likes-firebase");

/**
 * A plugin for making Firebase easy to use as the DB for your bot
 * @class
 */
module.exports.Plugin = class extends Plugin {
  constructor() {
    super();

    this.type = "client";

    this.initializeFirebase = (configPath) => {
      this.firebase = new MyCatLikesFirebaseServer({
        firebaseCredentialsPath: configPath,
      });

      this.firebase.initialize();
    };

    this.createUser = (userId, initialData) => {
      if (!this.firebase) this.initializeFirebase();

      this.firebase
        .createDoc(initialData, `users/${userId}`)
        .then(() => {
          return initialData;
        })
        .catch((err) => {
          console.error(err);

          return false;
        });
    };

    this.updateUser = (userId, updatedData) => {
      if (!this.firebase) this.initializeFirebase();

      this.firebase
        .updateDoc(updatedData, `users/${userId}`)
        .then(() => {
          return initialData;
        })
        .catch((err) => {
          console.error(err);

          return false;
        });
    };
  }
};
