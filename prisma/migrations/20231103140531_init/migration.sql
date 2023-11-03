-- CreateTable
CREATE TABLE "Activity" (
    "strava_id" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "strava_user_id" TEXT NOT NULL,
    "distance" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("strava_id")
);

-- CreateTable
CREATE TABLE "StravaUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "StravaUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StravaToken" (
    "strava_user_id" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,

    CONSTRAINT "StravaToken_pkey" PRIMARY KEY ("strava_user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Activity_strava_id_key" ON "Activity"("strava_id");

-- CreateIndex
CREATE UNIQUE INDEX "StravaUser_id_key" ON "StravaUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StravaToken_strava_user_id_key" ON "StravaToken"("strava_user_id");
