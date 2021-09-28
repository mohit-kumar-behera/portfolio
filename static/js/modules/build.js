// Build Education Timeline
const buildEducationTimeline = phase => `
		<div class="timeline--div">
			<div class="timeline--logo"><span class="fa fa-book"></span></div>
			<div class="timeline--content">
				<div class="timeline--duration pill-badge text-weight-bold">${phase.durationStr}</div>
				<div class="timeline--didWhat">${phase.tag}</div>
				<div class="timeline--fromWhere">${phase.name}</div>
			</div>
		</div>
	`;

// Build Skill Bar
const buildSkillBar = phase => `
		<div class="col-lg-3 col-md-4 col-sm-12 mb-3">
			<div class="skill-bar--wrapper">
				<div class="skill-bar--label text-weight-bold"><span>${phase.name}</span></div>
				<div class="mk-progress">
					<div class="mk-progress-bar" style="width: ${phase.rate * 100}%;">
						<span>${phase.rate * 100}%</span>
					</div>
				</div>
			</div>						
		</div>
	`;

// Build Experience Card
const buildExperienceCard = phase => `
		<div class="col-lg-6 col-md-12 col-sm-12 p-1 mb-2">
			<div class="info-card" data-id="${phase.name}">
				<div class="info-card--left">
					<img src="${phase.logo}" alt="${phase.name} logo"/>
				</div>
				<div class="info-card--right">
					<div class="info-card--content">
						<p class="experience--duration pill-badge text-weight-bold">${phase.durationStr}</p>
					</div>
					
					<div class="info-card--content">
						<p class="experience--position">${phase.position}</p>
					</div>
					
					<div class="info-card--content">
						<p class="experience--company"><a href="${phase.url}" class="link" target="_blank">${phase.name}</a></p>
					</div>
				</div>
			</div>
		</div>
	`;

// Build Award Card
// const buildAwardCard = phase => `
// 		<div class="display-card--div" data-img-src="${phase.imgPath}">
// 			<div class="display-card award-card">
// 				<div class="display-card--img">
// 					<img src="${phase.imgPath}" class="award--img"/>
// 				</div>

// 				<a href="${phase.imgPath}" class="display-card--link" target="_blank" alt="${phase.name} Certificate"></a>

// 				<div class="overlay--div"><span>View</span></div>
// 			</div>
// 		</div>
// 	`;

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

export {
  buildEducationTimeline,
  buildSkillBar,
  buildExperienceCard,
  buildAwardCard,
};
