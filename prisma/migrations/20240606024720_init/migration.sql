-- CreateTable
CREATE TABLE "surveys" (
    "id" SERIAL NOT NULL,
    "tanggalSurvey" TIMESTAMP(3) NOT NULL,
    "namaSurveyor" TEXT NOT NULL,
    "provinsi" TEXT NOT NULL,
    "ditjen" TEXT NOT NULL,
    "objInfra" TEXT NOT NULL,
    "geotagPoint" JSONB NOT NULL,
    "geotagLine" JSONB NOT NULL,
    "geotagAreaInfra" JSONB NOT NULL,
    "geotagAreaManf" JSONB NOT NULL,

    CONSTRAINT "surveys_pkey" PRIMARY KEY ("id")
);
