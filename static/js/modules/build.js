// Build Model for Theme Picker
const buildThemePickerModelBody = () => `
		<div class="theme-picker from-model">
			<div class="pallete">
				<button class="bttn color--btn" data-color="#913ee8" style="background: #913EE8"></button>
				<button class="bttn color--btn" data-color="#0556f3" style="background: #0556F3"></button>
				<button class="bttn color--btn" data-color="#fa1e0e" style="background: #FA1E0E"></button>
				<button class="bttn color--btn" data-color="#fe4c03" style="background: #fe4c03"></button>
				<button class="bttn color--btn" data-color="#ef5742" style="background: #EF5742"></button>
			</div>
			<div class="pallete">
				<button class="bttn color--btn" data-color="#f97194" style="background: #f97194"></button>
				<button class="bttn color--btn" data-color="#ffae00" style="background: #ffae00"></button>
				<button class="bttn color--btn" data-color="#73a528" style="background: #73A528"></button>
				<button class="bttn color--btn" data-color="#a0522d" style="background: #A0522D"></button>
				<button class="bttn color--btn" data-color="#01937c" style="background: #01937C"></button>
			</div>
		</div>
	`;

// Build Personal Info Card
const buildPersonalInfoCard = entry => {
  // Format the link (address, phone, email)
  const getFormattedLink = (key, val) =>
    `<a href="${val.url}" class="link" target="_blank">${val[key]}</a>`;

  return `
		<div class="entity text-weight-bold">
	 		<p class="key">${entry.key}</p>
	 		<p class="value">${
        entry.key.toLowerCase() !== 'address' &&
        entry.key.toLowerCase() !== 'phone' &&
        entry.key.toLowerCase() !== 'email'
          ? entry.value
          : getFormattedLink(entry.key.toLowerCase(), entry.value)
      }</p>
	 	</div>
	`;
};

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
  buildThemePickerModelBody,
  buildAccountCard,
  buildPersonalInfoCard,
  buildEducationTimeline,
  buildSkillBar,
  buildExperienceCard,
  buildAwardCard,
};
