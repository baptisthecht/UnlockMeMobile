import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStore = create(
    persist(
        (set, get) => ({ 
            RestaurantList: [], 
            FavoritesList: [],
            BookHistoryList: [],
        }), 
        {
            name: 'planeat-app',
            storage: createJSONStorage(() => AsyncStorage
        )}
    )
)