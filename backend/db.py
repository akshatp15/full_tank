from sqlalchemy import (MetaData, Table, Column, Integer, String, ForeignKey, create_engine, Numeric, Date)

import os

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "mysql+pymysql://root:password@localhost:3306/fullTank"
)

engine = create_engine(DATABASE_URL)

metadata = MetaData()

users = Table(
    "users", metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("username", String(50), unique=True),
    Column("password", String(255))
)

fills = Table(
    "fills", metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("user_id", Integer, ForeignKey("users.id", ondelete="CASCADE")),
    Column("fill_date", Date),
    Column("station_name", String(50)),
    Column("station_location", String(50)),
    Column("price", Numeric(10,3)),
    Column("total_cost", Numeric(10,3)),
    Column("litres", Numeric(10,3)),
    Column("vehicle", String(255))
)

metadata.create_all(engine)