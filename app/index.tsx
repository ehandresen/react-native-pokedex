import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { getPokemon, Pokemon } from '@/api/pokeapi';

const HomePage = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const load = async () => {
      const result = await getPokemon();
      console.log(result);
    };
    load();
  }, []);
  return (
    <View>
      <Link href="/(pokemon)/test" asChild>
        <Button title="details" />
      </Link>
    </View>
  );
};

export default HomePage;
