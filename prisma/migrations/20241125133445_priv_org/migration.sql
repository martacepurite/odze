-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Organization" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isPrivate" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Organization" ("id", "name") SELECT "id", "name" FROM "Organization";
DROP TABLE "Organization";
ALTER TABLE "new_Organization" RENAME TO "Organization";
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
