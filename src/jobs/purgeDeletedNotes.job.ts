import { purgeDeletedNotes } from "../modules/notes/notes.cleanup";
import cron from "node-cron";


export const startPurgeDeletedNotesJob = () => {
  cron.schedule("* 3 * * *", async () => {
    try {
      await purgeDeletedNotes();
    } catch (err) {
      console.error("[CRON] Failed to purge notes", err);
    }
  });
};
