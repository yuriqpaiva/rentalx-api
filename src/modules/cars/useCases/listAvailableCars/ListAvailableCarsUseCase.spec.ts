import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const createdCar = await carsRepositoryInMemory.create({
      brand: "Car 1",
      description: "Car description",
      name: "Car 1",
      daily_rate: 140,
      fine_amount: 100,
      license_plate: "ABC-1234",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([createdCar]);
  });

  it("should be able to list all available cars by brand", async () => {
    const createdCar = await carsRepositoryInMemory.create({
      brand: "Car brand test",
      description: "Car description",
      name: "Car 2",
      daily_rate: 140,
      fine_amount: 100,
      license_plate: "ABC-1234",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      brand: createdCar.brand,
    });

    expect(cars).toEqual([createdCar]);
  });

  it("should be able to list all available cars by name", async () => {
    const createdCar = await carsRepositoryInMemory.create({
      brand: "Car brand test",
      description: "Car description",
      name: "Car 3",
      daily_rate: 140,
      fine_amount: 100,
      license_plate: "ABC-1234",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      name: createdCar.name,
    });

    expect(cars).toEqual([createdCar]);
  });

  it("should be able to list all available cars by category", async () => {
    const createdCar = await carsRepositoryInMemory.create({
      brand: "Car brand test",
      description: "Car description",
      name: "Car 3",
      daily_rate: 140,
      fine_amount: 100,
      license_plate: "ABC-1234",
      category_id: "12345",
    });

    const cars = await listCarsUseCase.execute({
      name: createdCar.category_id,
    });

    expect(cars).toEqual([createdCar]);
  });
});
