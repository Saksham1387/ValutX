-- CreateEnum
CREATE TYPE "AuthProviders" AS ENUM ('GOOGLE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT,
ADD COLUMN     "profilePicture" TEXT,
ADD COLUMN     "providers" "AuthProviders" NOT NULL DEFAULT 'GOOGLE';
