
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



// Build card for social media account
const buildAccountCard = acc => `				 
		<div class="display-card--div social-link--div lazy-transition--bottom" data-social-handle="${acc.name}">
			<div class="display-card social-link" tabindex="0">
	
				<div class="display-card--img social-link--img">
					<img src="${acc.img}" alt="Mohit's ${acc.name} cover img"/>
				</div>

				<a href="${acc.url}" class="link display-card--link" target="_blank"></a>

				<div class="overlay--div"></div>

				<div class="social-link--logo">
					<span class="fa ${acc.logo} icon"></span>
				</div>
			</div>
		</div>
	`;




// Build Personal Info Card
const buildPersonalInfoCard = entry => {	
	// Format the link (address, phone, email)
	const getFormattedLink = (key, val) => `<a href="${val.url}" class="link" target="_blank">${val[key]}</a>`;
	
	return `
		<div class="entity">
	 		<p class="key">${entry.key}</p>
	 		<p class="value">${entry.key.toLowerCase() !== 'address' && entry.key.toLowerCase() !== 'phone' && entry.key.toLowerCase() !== 'email' ? entry.value : getFormattedLink(entry.key.toLowerCase(), entry.value)}</p>
	 	</div>
	`;
};

// Build Education Timeline
const buildEducationTimeline = phase => `
		<div class="timeline--div">
			<div class="timeline--logo"><span class="fa fa-book"></span></div>
			<div class="timeline--content">
				<div class="timeline--duration pill-badge">${phase.durationStr}</div>
				<div class="timeline--didWhat">${phase.tag}</div>
				<div class="timeline--fromWhere">${phase.name}</div>
			</div>
		</div>
	`;

// Build Skill Bar
const buildSkillBar = phase => `
		<div class="col-lg-3 col-md-4 col-sm-12 mb-3">
			<div class="skill-bar--wrapper lazy-transition--bottom">
				<div class="skill-bar--label"><span>${phase.name}</span></div>
				<div class="mk-progress">
					<div class="mk-progress-bar" style="width: ${phase.rate * 100}%;"><span>${phase.rate * 100}%</span></div>
				</div>
			</div>						
		</div>
	`;

// Build Experience Card
const buildExperienceCard = phase => `
		<div class="col-lg-6 col-md-12 col-sm-12 p-1 mb-2">
			<div class="experience-card lazy-transition--bottom">
				<div class="card-left">
					<img src="${phase.logo}" alt="${phase.name} logo"/>
				</div>
				<div class="card-right">
					<p class="experience--duration pill-badge">${phase.durationStr}</p>
					<p class="experience--position">${phase.position}</p>
					<p class="experience--company"><a href="${phase.url}" class="link" target="_blank">${phase.name}</a></p>
				</div>
			</div>
		</div>
	`;

// Build Award Card
const buildAwardCard = phase => `
		<div class="display-card--div lazy-transition--bottom">
			<div class="display-card">
				<div class="display-card--img">
					<img src="${phase.imgPath}" class="award--img"/>
				</div>

				<a href="${phase.imgPath}" class="display-card--link" target="_blank" alt="${phase.name} Certificate"></a>

				<div class="overlay--div"><span>View</span></div>
			</div>
		</div>
	`;


export {buildThemePickerModelBody, 
		buildAccountCard, 
		buildPersonalInfoCard, 
		buildEducationTimeline, 
		buildSkillBar, 
		buildExperienceCard, 
		buildAwardCard};