import {Dimensions} from 'react-native';

const params = {
    blockSize: 30,
    borderSize: 5,
    fontSize: 15,
    headerRatio: 0.15,
    difficultLevel: 0.1,
    getColumnsAmount() {
        const width = Dimensions.get('window').width;
        return Math.floor(width / params.blockSize);
    },
    getRowsAmount() {
        const totalHeight = Dimensions.get('window').height;
        const bordHeight = totalHeight * (1 - params.headerRatio);
        return Math.floor(bordHeight / params.blockSize);
    },
};

export default params;
