-- CreateTable
CREATE TABLE "Reviews" (
    "id" TEXT NOT NULL,
    "aromaScore" INTEGER NOT NULL,
    "appearanceScore" INTEGER NOT NULL,
    "flavorScore" INTEGER NOT NULL,
    "mouthfeelScore" INTEGER NOT NULL,
    "styleScore" INTEGER NOT NULL,
    "comments" TEXT,
    "submissionId" TEXT,
    "acetaldehyde" BOOLEAN NOT NULL,
    "alcoholic" BOOLEAN NOT NULL,
    "astringent" BOOLEAN NOT NULL,
    "diacetyl" BOOLEAN NOT NULL,
    "dimethylSulfide" BOOLEAN NOT NULL,
    "estery" BOOLEAN NOT NULL,
    "grassy" BOOLEAN NOT NULL,
    "lightStruck" BOOLEAN NOT NULL,
    "metallic" BOOLEAN NOT NULL,
    "musty" BOOLEAN NOT NULL,
    "oxidized" BOOLEAN NOT NULL,
    "phenolic" BOOLEAN NOT NULL,
    "solvent" BOOLEAN NOT NULL,
    "sourAcidic" BOOLEAN NOT NULL,
    "sulfur" BOOLEAN NOT NULL,
    "vegetal" BOOLEAN NOT NULL,
    "yeasty" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SequelizeMeta" (
    "name" TEXT NOT NULL,

    PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Submissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "style" TEXT,
    "notes" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reviews" ADD FOREIGN KEY ("submissionId") REFERENCES "Submissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
