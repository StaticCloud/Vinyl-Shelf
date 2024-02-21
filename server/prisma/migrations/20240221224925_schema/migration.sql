-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shelf" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "Shelf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vinyl" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "cover_image" TEXT NOT NULL,

    CONSTRAINT "Vinyl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "user_id" INTEGER NOT NULL,
    "shelf_id" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("user_id","shelf_id")
);

-- CreateTable
CREATE TABLE "VinylOnShelf" (
    "shelf_id" INTEGER NOT NULL,
    "vinyl_id" INTEGER NOT NULL,

    CONSTRAINT "VinylOnShelf_pkey" PRIMARY KEY ("vinyl_id","shelf_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vinyl_id_key" ON "Vinyl"("id");

-- AddForeignKey
ALTER TABLE "Shelf" ADD CONSTRAINT "Shelf_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_shelf_id_fkey" FOREIGN KEY ("shelf_id") REFERENCES "Shelf"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VinylOnShelf" ADD CONSTRAINT "VinylOnShelf_shelf_id_fkey" FOREIGN KEY ("shelf_id") REFERENCES "Shelf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VinylOnShelf" ADD CONSTRAINT "VinylOnShelf_vinyl_id_fkey" FOREIGN KEY ("vinyl_id") REFERENCES "Vinyl"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
