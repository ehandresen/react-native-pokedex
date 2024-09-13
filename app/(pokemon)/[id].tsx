import { View, Image, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { getPokemonDetails, Pokemon } from '@/api/pokeapi';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const [details, setDetails] = useState<Pokemon>();

  useEffect(() => {
    const load = async () => {
      const response = await getPokemonDetails(id!);
      setDetails(response);
    };
    load();
  }, [id]);

  useEffect(() => {
    if (details) {
      navigation.setOptions({
        title: details.name.charAt(0).toUpperCase() + details.name.slice(1),
      });
    }
  }, [details]);

  return (
    <View style={{ padding: 10 }}>
      {details && (
        <>
          <View style={[styles.card, { alignItems: 'center' }]}>
            <Image
              source={{ uri: details.sprites.front_default }}
              style={{ height: 200, width: 200 }}
            />
            <Text style={styles.name}>
              #{details.id} {details.name}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Stats:</Text>
            {details.stats.map((item: any) => (
              <Text key={item.stat.name}>
                {item.stat.name}: {item.base_stat}
              </Text>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    elevation: 1,
    gap: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

export default Page;
