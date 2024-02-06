import React, { createContext, useContext, useState } from "react";

type Game = {
  gameID: string;
	gameName: string;
    paymentPlanName: string;
	paymentPlanPrice: string;

};

/**
 *
 * The properties of the useCurrentGame hook
 *
 */
interface useCurrentGameProperties {
    currentGame: Game;
}

/**
 *
 * Props to the ProvideCurrentGame component
 *
 */
type Props = {
    children?: React.ReactNode;
};

// The currentGameContext is used to provide the data to the useCurrentGame hook
const currentGameContext = createContext({} as useCurrentGameProperties);

/**
 * Setting the useCurrentGame hook to use the currentGameContext
 * @returns The data to be used by the useCurrentGame hook
 */
export function useCurrentGame() {
	return useContext(currentGameContext);
}

/**
 *
 * The useProvideCurrentGame hook is used to provide the data to the useCurrentGame hook
 *
 * @returns The data to be used by the useCurrentGame hook
 */
function useProvideCurrentGame(): useCurrentGameProperties {
	/* eslint-disable */
    const [currentGame, setCurrentGame] = useState(
		{
			gameID: "0",
            gameName: "",
            paymentPlanName: "Unselected Plan",
			paymentPlanPrice: "$x.xx",
		},
	);
    /* eslint-enable */

	return {
		currentGame: currentGame,
	};
}


/**
 * The ProvideCurrentGame component is used to provide the data to the useCurrentGame hook
 *
 * @param children The children of the component
 * @returns The data to be used by the useCurrentGame hook
 */
// eslint-disable-next-line func-style
export const ProvideCurrentGame: React.FC<Props> = ({ children }) => {
	const currentGame = useProvideCurrentGame();
	return <currentGameContext.Provider value={currentGame}>{children}</currentGameContext.Provider>;
};
