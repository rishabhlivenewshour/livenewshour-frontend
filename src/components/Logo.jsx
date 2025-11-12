import LogoVideo from '../assets/logo.mp4';

const Logo = () => {
	return (
		<video
			autoPlay
			loop
			muted
			playsInline
			className='h-[60px] lg:h-[70px] w-[250px]'
			
		>
			<source src={LogoVideo} type='video/mp4' />
			Your browser does not support the video tag.
		</video>
	);
};

export default Logo;
