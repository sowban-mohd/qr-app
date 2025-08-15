import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScannerScreen from './home/ScannerScreen';
import HistoryScreen from './home/HistoryScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#fff', borderTopWidth: 0, elevation: 5, paddingTop: 5, paddingBottom: 5,
          height: 68,
        },
        tabBarActiveTintColor: '#4e9cff',
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Scanner') iconName = 'scan-outline';
          else if (route.name === 'History') iconName = 'time-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Scanner" component={ScannerScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}
