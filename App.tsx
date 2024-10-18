import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Modal, FlatList,TouchableOpacity } from 'react-native';

const DATA = [
  { id: '1', sname: 'Starters Menu', description: 'Dark chicken and sour cherry terrine,Dark chicken and sour cherry terrine is a savory dish featuring tender dark chicken meat balanced with the tart sweetness of sour cherries. Served chilled, it offers a rich, flavorful contrast and makes an elegant appetizer or addition to a charcuterie board.', price: 'R100.00' },
  { id: '2', sname: 'Main Course', description: 'Chicken Picatta meatballs and a A variety of main dishes,Chicken Piccata Meatballs: These tender meatballs are inspired by the classic Chicken Piccata dish. Made from ground chicken, they’re simmered in a tangy lemon-butter sauce with capers, creating a bright, savory flavor that pairs well with pasta or vegetables.', price: 'R200.00' },
  { id: '3', sname: 'Dessert', description: 'Carrot Cake,Delicious desserts to end your meal,Carrot Cake: A moist, spiced cake made with fresh carrots, often topped with a rich cream cheese frosting. It offers a perfect blend of sweetness and warmth, with hints of cinnamon and nutmeg.', price: 'R100.00' },
];

type ItemsProps = { sname: string; description: string; price: string; onPress: () => void };

const Item = ({ sname, description, price, onPress }: ItemsProps) => (
  <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
    <Text style={styles.itemName}>{sname}</Text>
    <Text>{description}</Text>
    <Text style={styles.itemPrice}>{price}</Text>
  </TouchableOpacity>
);

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  const openModal = (dish) => {
    setSelectedDish(dish);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDish(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.moduleList}> Menu</Text>

      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            sname={item.sname}
            description={item.description}
            price={item.price}
            onPress={() => openModal(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          {selectedDish && (
            <>
              <Text style={styles.modalTitle}>{selectedDish.sname}</Text>
              <Text>{selectedDish.description}</Text>
              <Text style={styles.itemPrice}>{selectedDish.price}</Text>
              <Button title="Back to Menu" onPress={closeModal} />
            </>
          )}
        </View>
      </Modal>

      <Text style={styles.totalCourses}>Total {DATA.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b3b3cc',
    padding: 10,
    marginTop: 10,
  },
  moduleList: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 4,
    textAlign: 'center',
  },
  itemContainer: {
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 16,
    color: '#ff3300',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  totalCourses: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
})