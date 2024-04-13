Example:

const { PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

class Services {
  constructor(modelName) {
    this.model = modelName;
  }
  
  async getAllRegister (where = {}) {
    return await prisma.[this.model].findAll
  }
}