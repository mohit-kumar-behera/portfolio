const buildAwardCard = phase => `
		<div class="display-card--div" data-img-src="${phase.imgPath}">
			<div class="display-card award-card">
				<div class="display-card--img">
					<img src="${phase.imgPath}" class="award--img"/>
				</div>

				<div class="overlay--div"><span>View</span></div>
			</div>
		</div>
	`;

export { buildAwardCard };
