-- CreateEnum
CREATE TYPE "role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "role" "role" NOT NULL DEFAULT E'USER',
    "fullName" TEXT,
    "phone" TEXT,
    "gender" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "basket" (
    "userId" INTEGER NOT NULL,

    CONSTRAINT "basket_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "favorite" (
    "userId" INTEGER NOT NULL,

    CONSTRAINT "favorite_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "categories" (
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "mainSpecs" TEXT NOT NULL,
    "isInStock" BOOLEAN NOT NULL,
    "price" INTEGER NOT NULL,
    "reviews" INTEGER,
    "rating" INTEGER,
    "discount" INTEGER,
    "basketId" INTEGER,
    "favoriteId" INTEGER,
    "categoryName" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specs" (
    "specGroupTitle" TEXT NOT NULL,
    "productId" INTEGER,

    CONSTRAINT "specs_pkey" PRIMARY KEY ("specGroupTitle")
);

-- CreateTable
CREATE TABLE "specGroupValue" (
    "specTitle" TEXT NOT NULL,
    "specValue" TEXT NOT NULL,
    "specSpecGroupTitle" TEXT,

    CONSTRAINT "specGroupValue_pkey" PRIMARY KEY ("specTitle")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "basket" ADD CONSTRAINT "basket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "basket"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "categories"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specs" ADD CONSTRAINT "specs_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specGroupValue" ADD CONSTRAINT "specGroupValue_specSpecGroupTitle_fkey" FOREIGN KEY ("specSpecGroupTitle") REFERENCES "specs"("specGroupTitle") ON DELETE SET NULL ON UPDATE CASCADE;
