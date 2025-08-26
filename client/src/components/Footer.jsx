export const Footer = () => {
	return (
		<footer className="bg-gray-50 shadow-lg border-t border-white/10">
			<div className="w-full mx-auto max-w-screen-xl p-6 md:flex md:items-center md:justify-between">
				<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
					&copy; {new Date().getFullYear()} SmartCV. All Rights Reserved.
				</span>
			</div>
		</footer>
	);
};
