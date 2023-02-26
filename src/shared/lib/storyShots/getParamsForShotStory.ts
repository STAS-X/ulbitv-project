export const getParamsForScreenShot = (cssStory: string) => {
	return {
		screenshot: {
			variants: {
				mobile: {
					viewport: {
						width: 800,
						height: 600,
						isMobile: true,
						isLandscape: true,
						deviceScaleFactor: 1,
					},
				},
				tablete: {
					viewport: {
						width: 1024,
						height: 800,
						isMobile: false,
						isLandscape: true,
						deviceScaleFactor: 1,
					},
				},
			},
			hovered: {
				extends: 'mobile',
				hover: cssStory,
			},
			focused: {
				extends: 'tablete',
				hover: cssStory,
			},
		},
	};
};