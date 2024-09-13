import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { getPokemons, Pokemon } from '@/api/pokeapi';
import { Ionicons } from '@expo/vector-icons';

const HomePage = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const load = async () => {
      const result = await getPokemons();

      setPokemons(result);
    };
    load();
  }, []);
  return (
    <ScrollView>
      {pokemons.map((pokemon) => (
        <Link href={`/(pokemon)/${pokemon.id}`} key={pokemon.id} asChild>
          <TouchableOpacity>
            <View style={styles.item}>
              <Image source={{ uri: pokemon.image }} style={styles.image} />
              <Text style={styles.itemText}>{pokemon.name}</Text>
              <Ionicons name="chevron-forward" size={24} />
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 100,
    width: 100,
  },
  itemText: {
    fontSize: 18,
    textTransform: 'capitalize',
    flex: 1,
  },
});

export default HomePage;
