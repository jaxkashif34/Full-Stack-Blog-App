-- CreateTable
CREATE TABLE "car" (
    "make" VARCHAR(100) NOT NULL,
    "model" VARCHAR(100) NOT NULL,
    "price" DECIMAL(19,2) NOT NULL,
    "ownerId" BIGINT,
    "id" BIGSERIAL NOT NULL,

    CONSTRAINT "car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "person" (
    "id" BIGSERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(150),
    "gender" VARCHAR(10) NOT NULL,
    "date_of_birth" DATE NOT NULL,
    "country_of_birth" VARCHAR(50) NOT NULL,

    CONSTRAINT "person_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "car_ownerId_key" ON "car"("ownerId");

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "person"("id") ON DELETE SET NULL ON UPDATE CASCADE;
