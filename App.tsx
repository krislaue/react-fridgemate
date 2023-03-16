import React, {Component} from 'react';
import {Alert, Button, StyleSheet, View} from 'react-native';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {TouchableOpacity } from 'react-native';
import MealList from "./MealList";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';

type Recipe = {
  extendedIngredients: extendedIngredient;
  title: string;
  readyInMinutes: int;
  servings: int;
  id: int;
  summary: string;
  image: string;
  instructions: string;
  analyzedInstructions: analyzedInstruction;
  sourceUrl: string;
};

type extendedIngredient = {
  id: int;
  aisle: string;
  image: string;
  name: string;
  original: string;
  originalName: string;
  amount: double;
  unit: string;
};

type analyzedInstruction = {
  name: string;
  steps: step;
};

type step = {
  number: int;
  step: string;
  ingredients: extendedIngredient;
};




function getMealData() {


}


function HomeScreen() {
    const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Recipe[]>([]);

  const getRecipes = async () => {
    try {
      const response = await fetch('https://api.spoonacular.com/recipes/random?apiKey=ad6b49472d7e4267891b4a52dcc07a2c&number=1&tags=vegetarian,dessert');
      const json = await response.json();
      setData(json.recipes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
{/*      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({recipe}) => (
            <Text>
              {recipe.title}, {recipe.summary}
            </Text>
          )}
        />
      )}*/}
    </View>
  );
};


function SettingsScreen() {


    const [isLoading, setLoading] = useState(false);
    const [recipes, setRecipes] = useState([]);
    getRecipes = () => {
        fetch('https://api.spoonacular.com/recipes/random?apiKey=ad6b49472d7e4267891b4a52dcc07a2c&number=1&tags=vegetarian,dessert')
          .then((response) => response.json())
          .then((json) => setRecipes(json))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
    }
    useEffect(() => {
        setLoading(true);
        getRecipes();
    }, []);
    return(
        <View style={{ padding: 20 }}>
            {isLoading ? <Text>Loading...</Text> :
            (
                <FlatList
                    data={recipes}
                    keyExtractor={({ id }) => id.toString()}
                    renderItem={({ item }) => <Text>{item.title}  </Text>}
                />
            )}
        </View>
    );
}

function FridgeScreen() {
    return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
  // fetch('https://api.spoonacular.com/recipes/random?apiKey=ad6b49472d7e4267891b4a52dcc07a2c&number=1&tags=vegetarian,dessert')
  // .then((response) => response.json())
  // .then((data) => {
  //   // etMealData(data);
  //   console.log(data);
  // })
  // .catch(() => {
  //   console.log("error");
  // });

}

function SearchScreen() {
const [mealData, setMealData] = useState({});

useEffect(() => {
  getMealData();
}, []);

const getMealData = async () => {
  const response = await fetch('https://api.spoonacular.com/recipes/random?apiKey=ad6b49472d7e4267891b4a52dcc07a2c&number=1&tags=vegetarian,dessert');
  const jsonData = await response.json();
  setMealData(jsonData);
}

  return (
        <View>
      <Text>Macros</Text>
      <Text>{JSON.stringify(mealData)}</Text>
        {/*mealData["recipes"][0].title)*/}
{/*        <li>Carbohydrates: {mealData.nutrients.carbohydrates.toFixed(0)}</li>
        <li>Fat: {mealData.nutrients.fat.toFixed(0)}</li>
        <li>Protein: {mealData.nutrients.protein.toFixed(0)}</li>*/}


    </View>    
  );
}



const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Fridge" component={FridgeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />


      </Tab.Navigator>
    </NavigationContainer>
  );
}