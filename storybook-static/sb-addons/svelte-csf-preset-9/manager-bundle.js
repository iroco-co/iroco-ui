try {
	(() => {
		var r = 'storybook/svelte-csf';
		var _ = __STORYBOOK_API__,
			{
				ActiveTabs: h,
				Consumer: O,
				ManagerContext: b,
				Provider: d,
				addons: s,
				combineParameters: A,
				controlOrMetaKey: T,
				controlOrMetaSymbol: k,
				eventMatchesShortcut: g,
				eventToShortcut: D,
				isMacLike: M,
				isShortcutTaken: P,
				keyToSymbol: v,
				merge: f,
				mockChannel: x,
				optionOrAltSymbol: C,
				shortcutMatchesShortcut: I,
				shortcutToHumanString: K,
				types: B,
				useAddonState: G,
				useArgTypes: N,
				useArgs: R,
				useChannel: Y,
				useGlobalTypes: H,
				useGlobals: L,
				useParameter: j,
				useSharedState: q,
				useStoryPrepared: w,
				useStorybookApi: z,
				useStorybookState: E
			} = __STORYBOOK_API__;
		s.register(r, () => {});
	})();
} catch (e) {
	console.error('[Storybook] One of your manager-entries failed: ' + import.meta.url, e);
}
