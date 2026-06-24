export class AssetsValidationError extends Error {
	problems: string[];

	constructor(problems: string[]) {
		super();

		this.problems = problems;
		this.message = `Asset validation failed with ${
			problems.length
		} issue(s) (likely upstream game-data schema drift):\n${problems
			.slice(0, 20)
			.join("\n")}${
			problems.length > 20 ? `\n…and ${problems.length - 20} more` : ""
		}`;
	}
}
