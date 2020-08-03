import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Alert} from 'react-native';

import params from '../params';
import MineField from './MineField';
import Header from './Header';
import LevelSelection from './screens/LevelSelection';
import {
    createMinedBoard,
    cloneBoard,
    showMines,
    wonGame,
    hadExposion,
    openField,
    inverFlag,
    flagsUsed,
} from '../logicas';

const App = () => {
    // const [cols, setCols] = useState(params.getColumnsAmount());
    // const [rows, setRows] = useState(params.getRowsAmount());
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    const minesAmount = () => {
        // this.cols = params.getColumnsAmount();
        // this.rows = params.getRowsAmount();
        return Math.ceil(cols * rows * params.difficultLevel);
    };

    // const createState = () => {
    //     const cols = params.getColumnsAmount();
    //     const rows = params.getRowsAmount();
    //     return {
    //         board: createMinedBoard(rows, cols, minesAmount()),
    //         lost: false,
    //         won: false,
    //     };
    // };

    //fazendo diferente

    const [board, setBoard] = useState(
        createMinedBoard(rows, cols, minesAmount()),
    );
    const [lost, setLost] = useState(false);
    const [won, setWon] = useState(false);
    const [showLevelSelection, setShowLevelSelection] = useState(false);

    const onOpenField = (row, column) => {
        const boarder = cloneBoard(board);

        openField(boarder, row, column);
        // setCols(params.getColumnsAmount());
        // setRows(params.getRowsAmount());

        if (lost) {
            showMines(boarder);
            Alert.alert('Perdeuuuu!!!');
        }
        if (won) {
            Alert.alert('Parabéns', 'Você Venceu!');
        }
        setLost(hadExposion(boarder));
        setWon(wonGame(boarder));
        setBoard(boarder);
    };

    const onSelectField = (row, column) => {
        const boardclone = cloneBoard(board);
        inverFlag(boardclone, row, column);
        setWon(wonGame(boardclone));

        if (won) {
            Alert.alert('Parabéns');
        }
        setBoard(boardclone);
    };
    const onLevelSelection = (level) => {
        params.difficultLevel = level;
        setBoard(createMinedBoard(rows, cols, minesAmount()));
        setLost(false);
        setWon(false);
        setShowLevelSelection(false);
    };
    //não abre ondem não tem mina proxima
    //só abre os que tem mina proxima
    return (
        <SafeAreaView style={styles.container}>
            <LevelSelection
                isVisible={showLevelSelection}
                onLevelSelection={onLevelSelection}
                onCancel={() => {
                    setShowLevelSelection(false);
                }}
            />
            <Header
                flagsLeft={minesAmount() - flagsUsed(board)}
                onNewGame={() => {
                    setBoard(createMinedBoard(rows, cols, minesAmount()));
                    setLost(false);
                    setWon(false);
                    //setShowLevelSelection(false);
                }}
                onFlagPress={() => setShowLevelSelection(true)}
            />
            <View style={styles.board}>
                <MineField
                    board={board}
                    onOpenField={onOpenField}
                    onSelectField={onSelectField}
                />
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    board: {
        alignItems: 'center',
        backgroundColor: '#aaa',
    },
});

export default App;
