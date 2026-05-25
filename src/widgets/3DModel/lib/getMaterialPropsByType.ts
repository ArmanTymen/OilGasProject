export const getMaterialPropsByType = (type: string) => {
    switch (type) {
        case 'oil': 
            return { color: '#111111', roughness: 0.1, metalness: 0.5 }; // Блестящий черный
        case 'sand': 
            return { color: '#FFC107', roughness: 1, metalness: 0 };    // Матовый желтый
        case 'clay': 
            return { color: '#795548', roughness: 0.8, metalness: 0 }; 
        case 'rock': 
            return { color: '#f99a7b', roughness: 0.8, metalness: 0 };  // Грубый коричневый
        default: 
            return { color: '#9e9e9e', roughness: 0.5, metalness: 0 };
    }
}