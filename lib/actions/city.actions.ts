'use server';
import { CreateCityNameParams } from '../constants/types/CreateCityNameParams';
import City from '../models/city.model';
import Ride from '../models/ride.model';
import { connect } from '../mongoose';
import { handleError } from '../utils';

export const createCity = async ({ name }: CreateCityNameParams) => {
  try {
    await connect();

    const newCity = await City.create({ name });

    return JSON.parse(JSON.stringify(newCity));
  } catch (error) {
    handleError(error);
  }
};

export const getAllCities = async () => {
  try {
    await connect();

    const cities = await City.find();

    return JSON.parse(JSON.stringify(cities));
  } catch (error) {
    handleError(error);
  }
};
