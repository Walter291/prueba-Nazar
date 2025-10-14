import { useEffect, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { completarTarea, getTareas, getTareasFiltradas } from '../../api/tareasApi';

export default function TareaList({ navigation }) {
  const [tareas, setTareas] = useState([]);
  const [filtro, setFiltro] = useState(null); // null = todas, true = completadas, false = pendientes

  const cargarTareas = async () => {
    if (filtro === null) {
      const data = await getTareas();
      setTareas(data);
    } else {
      const data = await getTareasFiltradas(filtro);
      setTareas(data);
    }
  };

  useEffect(() => {
    cargarTareas();
  }, [filtro]);

  const marcarComoCompletada = async (id) => {
    const ok = await completarTarea(id);
    if (ok) {
      Alert.alert('Éxito', 'Tarea marcada como completada');
      cargarTareas();
    } else {
      Alert.alert('Error', 'No se pudo marcar como completada');
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginVertical: 6,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.titulo}</Text>
      <Text style={{ color: '#555', marginBottom: 6 }}>{item.descripcion}</Text>
      <Text style={{ color: item.estado ? 'green' : 'orange', fontWeight: 'bold' }}>
        {item.estado ? 'Completada' : 'Pendiente'}
      </Text>
      <Text style={{ fontSize: 12, color: '#777' }}>
        {new Date(item.fechaCreacion).toLocaleDateString()}
      </Text>

      {!item.estado ? (
        <TouchableOpacity
          onPress={() => marcarComoCompletada(item.id)}
          style={{
            backgroundColor: '#007bff',
            padding: 10,
            borderRadius: 6,
            marginTop: 8,
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Marcar como completada</Text>
        </TouchableOpacity>
      ) : (
        <Text style={{ color: 'green', marginTop: 8, textAlign: 'center' }}>✔ Completada</Text>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 15, backgroundColor: '#f5f5f5' }}>
      {/* Botones superiores */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Nueva Tarea')}
          style={{
            backgroundColor: 'green',
            padding: 10,
            borderRadius: 6,
            flex: 1,
            marginHorizontal: 5,
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Nueva Tarea</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFiltro(true)}
          style={{
            backgroundColor: '#6c757d',
            padding: 10,
            borderRadius: 6,
            flex: 1,
            marginHorizontal: 5,
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Completadas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFiltro(false)}
          style={{
            backgroundColor: '#343a40',
            padding: 10,
            borderRadius: 6,
            flex: 1,
            marginHorizontal: 5,
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Pendientes</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de tareas */}
      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: '#777', marginTop: 30 }}>
            No hay tareas para mostrar
          </Text>
        }
      />
    </View>
  );
}
