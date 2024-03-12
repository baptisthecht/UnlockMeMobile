import { createContext, useContext, useState } from "react";

interface LoadingProps {
	loading: boolean;
	setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingProps>({
	loading: false,
	setLoading: () => {},
});

export const useLoading = () => {
	return useContext(LoadingContext);
};

export const LoadingProvider = ({ children }: any) => {
	const [loading, setLoading] = useState<boolean>(false);

	return (
		<LoadingContext.Provider value={{ loading, setLoading }}>
			{children}
		</LoadingContext.Provider>
	);
};
