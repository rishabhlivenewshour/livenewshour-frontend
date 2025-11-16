import LogoVideo from '../assets/logo2.mp4';

const Logo = () => {
	return (
		<video
			autoPlay			
			muted
			playsInline
			className='h-[70px] lg:h-[85px] w-[250px]'
			
		>
			<source src={LogoVideo} type='video/mp4' />
			Your browser does not support the video tag.
		</video>
	);
};

export default Logo;
