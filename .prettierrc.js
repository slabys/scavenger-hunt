module.exports = {
	plugins: ["@trivago/prettier-plugin-sort-imports"],
	bracketSameLine: false,
	bracketSpacing: true,
	importOrder: ["<THIRD_PARTY_MODULES>", "^[./]"],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	importOrderCaseInsensitive: false,
	parser: "typescript",
	printWidth: 120,
	semi: true,
	singleQuote: false,
	tabWidth: 4,
	trailingComma: "all",
	useTabs: true,
	overrides: [
		{
			files: "*.css",
			options: {
				parser: "css",
			},
		},
	],
};
