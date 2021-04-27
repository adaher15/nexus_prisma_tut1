DROP SCHEMA IF EXISTS  farmers CASCADE;
CREATE SCHEMA farmers;

CREATE TABLE farmers."Region" (
  id serial PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(124),
  UNIQUE (name)
);

CREATE TABLE farmers."Role" (
  id serial PRIMARY KEY,
  role VARCHAR(50) NOT NULL,
  description VARCHAR(124),
  UNIQUE (role)
);

CREATE TABLE farmers."Address" (
  id serial PRIMARY KEY,
  unit INTEGER,
  "number" INTEGER NOT NULL,
  "street" VARCHAR(112) NOT NULL,
  "city" VARCHAR(112) NOT NULL,
  "province" VARCHAR(112) NOT NULL,
  "country" VARCHAR(50) DEFAULT 'canada',
  "postalCode" VARCHAR(10)
  );


CREATE TABLE farmers."UserStatus" (
  id serial PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(124),
  UNIQUE (name)
);
INSERT INTO farmers."UserStatus"(id, name) VALUES (1, 'pending');
INSERT INTO farmers."UserStatus"(id, name) VALUES (2, 'active');
INSERT INTO farmers."UserStatus"(id, name) VALUES (3, 'blocked');
INSERT INTO farmers."UserStatus"(id, name) VALUES (4, 'suspended');
INSERT INTO farmers."UserStatus"(id, name) VALUES (5, 'deleted');
INSERT INTO farmers."UserStatus"(id, name) VALUES (6, 'invited');

CREATE TABLE farmers."UserType" (
  id serial PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(124),
  UNIQUE (name)
);
INSERT INTO farmers."UserType"(id, name) VALUES (1, 'admin');
INSERT INTO farmers."UserType"(id, name) VALUES (2, 'farmer');
INSERT INTO farmers."UserType"(id, name) VALUES (3, 'buyer');

CREATE TABLE farmers."User" (
  id serial PRIMARY KEY,
--   username VARCHAR(50) UNIQUE NOT NULL,
  "email" VARCHAR(254) UNIQUE NOT NULL,
  "password" VARCHAR(254) NOT NULL,
  "passwordExpired" BOOLEAN DEFAULT FALSE,
  "status" INTEGER NOT NULL DEFAULT 0,
  "tempPassword" VARCHAR(254),
  "tempPasswordDate" TIMESTAMP,
  "userType" INTEGER NOT NULL,
  CONSTRAINT fk_user_status FOREIGN KEY (status) REFERENCES farmers."UserStatus" (id),
  CONSTRAINT fk_user_type FOREIGN KEY (status) REFERENCES farmers."UserType" (id)
  );

CREATE TABLE farmers."UserActivation" (
  "userId" INTEGER NOT NULL,
  activationCode VARCHAR(50) UNIQUE NOT NULL,
  "creationDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("userId"),
  CONSTRAINT fk_user_activation FOREIGN KEY ("userId") REFERENCES farmers."User" (id)
);

-- -----------------------------------------------------
-- Table farmers.person
-- If sender is person store the information in this table
-- OK
-- -----------------------------------------------------
CREATE TABLE farmers."UserProfile" (
  "userId" INTEGER UNIQUE NOT NULL, 
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  "addressId" INTEGER,
  telephone VARCHAR(15),
  cellphone VARCHAR(15),
  PRIMARY KEY ("userId"),
  CONSTRAINT fk_user_id FOREIGN KEY ("userId") REFERENCES farmers."User"(id),
  CONSTRAINT fk_user_addressid FOREIGN KEY ("addressId") REFERENCES farmers."Address"(id)
  );



CREATE TABLE farmers."ProduceCategories" (
  id INTEGER PRIMARY KEY,
  "name" VARCHAR(50) UNIQUE NOT NULL,
  "description" VARCHAR(1024),
  "canBeShipped" BOOLEAN DEFAULT TRUE,
  "creationDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
-- Allowed categories
INSERT INTO farmers."ProduceCategories" (id, "name") VALUES (1, 'Vegitables');
INSERT INTO farmers."ProduceCategories" (id, "name") VALUES (2, 'Fruits');
INSERT INTO farmers."ProduceCategories" (id, "name") VALUES (3, 'Nuts');
INSERT INTO farmers."ProduceCategories" (id, "name") VALUES (4, 'Dairy');
INSERT INTO farmers."ProduceCategories" (id, "name") VALUES (5, 'Eggs');
INSERT INTO farmers."ProduceCategories" (id, "name") VALUES (6, 'Honey');
INSERT INTO farmers."ProduceCategories" (id, "name") VALUES (7, 'Meat');


CREATE TABLE farmers."Produce" (
  id serial PRIMARY KEY,
  "description" VARCHAR(1024) NOT NULL,
  "creationDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "category" INTEGER NOT NULL,
  CONSTRAINT fk_item_category FOREIGN KEY ("category") REFERENCES farmers."ProduceCategories" (id)
);

CREATE TABLE farmers."Farms" (
  id serial PRIMARY KEY,
  "name" VARCHAR(1024) NOT NULL,
  "address" INTEGER NOT NULL,
  "creationDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_farm_address FOREIGN KEY ("address") REFERENCES farmers."Address" (id)
);

CREATE TABLE farmers."FarmProduce" (
  id serial PRIMARY KEY,
  "farmeId" INTEGER NOT NULL,
  "produceId" INTEGER NOT NULL,
  "creationDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_farm_id FOREIGN KEY ("farmeId") REFERENCES farmers."Farms" (id),
  CONSTRAINT fk_prroduce_id FOREIGN KEY ("produceId") REFERENCES farmers."Produce" (id)
);

CREATE TABLE farmers."FarmReferenceBaskets" (
  id serial PRIMARY KEY,
  "farmeId" INTEGER NOT NULL,
  "name" VARCHAR(1024) NOT NULL,
  "description" VARCHAR(1024) NOT NULL,
  "size" VARCHAR(1024) NOT NULL,
  "weight" VARCHAR(1024) NOT NULL,
  "creationDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_farm_id FOREIGN KEY ("farmeId") REFERENCES farmers."Farms" (id)
);

CREATE TABLE farmers."FarmOfferedBaskets" (
  id serial PRIMARY KEY,
  "farmeId" INTEGER NOT NULL,
  "offeredBasketId" INTEGER NOT NULL,
  "description" VARCHAR(1024) NOT NULL,
  "creationDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "startOfferDate" TIMESTAMP,
  "endOfferDate" TIMESTAMP,
  CONSTRAINT fk_farm_id FOREIGN KEY ("farmeId") REFERENCES farmers."Farms" (id)
);

CREATE TABLE farmers."BasketItems" (
  id serial PRIMARY KEY,
  "offeredBasketId" INTEGER NOT NULL,
  "ProduceId" INTEGER NOT NULL,
  "quantity" VARCHAR(1024) NOT NULL,
  "creationDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_offered_basket_id FOREIGN KEY ("offeredBasketId") REFERENCES farmers."FarmOfferedBaskets" (id),
  CONSTRAINT fk_basket_produce_id FOREIGN KEY ("ProduceId") REFERENCES farmers."FarmProduce" (id)
);
