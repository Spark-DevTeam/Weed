import '@styles/Task.scss';

interface TaskProps {
  image: string;
  description: string;
  reward: number;
  taskStatus: string;
  uuid: string;
  link: string;
  onTaskStatusChange: (newStatus: string) => void;
  onClick: (uuid: string) => void;
}

export const Task: React.FC<TaskProps> = ({
  image,
  description,
  reward,
  taskStatus,
  link,
  onTaskStatusChange,
}) => {
  const handleTaskAction = () => {
    if (taskStatus === 'open') {
      onTaskStatusChange('claim');
    } else if (taskStatus === 'claim') {
      onTaskStatusChange('claimed');
    }
  };

  const renderButton = () => {
    switch (taskStatus) {
      case 'open':
        return (
          <div className='open' onClick={handleTaskAction}>
            <a href={link} target='_blank'>
              <svg
                width='71'
                height='24'
                viewBox='0 0 71 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <g filter='url(#filter0_b_87_131)'>
                  <rect
                    x='0.5'
                    width='70'
                    height='24'
                    rx='12'
                    fill='url(#paint0_radial_87_131)'
                    fill-opacity='0.2'
                  />
                  <rect
                    x='1'
                    y='0.5'
                    width='69'
                    height='23'
                    rx='11.5'
                    stroke='url(#paint1_radial_87_131)'
                  />
                  <rect
                    x='1'
                    y='0.5'
                    width='69'
                    height='23'
                    rx='11.5'
                    stroke='url(#paint2_radial_87_131)'
                  />
                  <path
                    d='M25.5 14.5V13.875H26.125V8.875H25.5V8.25H23V8.875H22.375V13.875H23V14.5H25.5ZM22.375 15.75V15.125H21.75V14.5H21.125V8.25H21.75V7.625H22.375V7H26.125V7.625H26.75V8.25H27.375V14.5H26.75V15.125H26.125V15.75H22.375ZM33 14.5V13.875H33.625V10.75H33V10.125H30.5V10.75H29.875V13.875H30.5V14.5H33ZM28.625 17V8.875H29.875V9.5H30.5V8.875H33.625V9.5H34.25V10.125H34.875V14.5H34.25V15.125H33.625V15.75H30.5V15.125H29.875V17H28.625ZM41.125 12V10.75H40.5V10.125H38V10.75H37.375V12H41.125ZM37.375 15.75V15.125H36.75V14.5H36.125V10.125H36.75V9.5H37.375V8.875H41.125V9.5H41.75V10.125H42.375V13.25H37.375V13.875H38V14.5H42.375V15.75H37.375ZM43.625 15.75V8.875H44.875V9.5H45.5V8.875H48.625V9.5H49.25V10.125H49.875V15.75H48.625V10.75H48V10.125H45.5V10.75H44.875V15.75H43.625Z'
                    fill='#8051F1'
                  />
                </g>
                <defs>
                  <filter
                    id='filter0_b_87_131'
                    x='-50.7103'
                    y='-51.2103'
                    width='172.421'
                    height='126.421'
                    filterUnits='userSpaceOnUse'
                    color-interpolation-filters='sRGB'>
                    <feFlood flood-opacity='0' result='BackgroundImageFix' />
                    <feGaussianBlur
                      in='BackgroundImageFix'
                      stdDeviation='25.6051'
                    />
                    <feComposite
                      in2='SourceAlpha'
                      operator='in'
                      result='effect1_backgroundBlur_87_131'
                    />
                    <feBlend
                      mode='normal'
                      in='SourceGraphic'
                      in2='effect1_backgroundBlur_87_131'
                      result='shape'
                    />
                  </filter>
                  <radialGradient
                    id='paint0_radial_87_131'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    gradientTransform='translate(11.2236 5.04989) rotate(18.7925) scale(66.6633 44.0548)'>
                    <stop stop-color='#8051F1' />
                    <stop
                      offset='0.770833'
                      stop-color='#8051F1'
                      stop-opacity='0.223958'
                    />
                    <stop offset='1' stop-color='#8051F1' stop-opacity='0' />
                  </radialGradient>
                  <radialGradient
                    id='paint1_radial_87_131'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    gradientTransform='translate(-9.12842 -2.96747) rotate(17.2702) scale(58.9211 66.1387)'>
                    <stop stop-color='#AC8AFF' />
                    <stop offset='1' stop-color='#AC8AFF' stop-opacity='0' />
                  </radialGradient>
                  <radialGradient
                    id='paint2_radial_87_131'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    gradientTransform='translate(76.2953 27.0195) rotate(-159.856) scale(56.2365 66.4955)'>
                    <stop stop-color='#8051F1' />
                    <stop offset='1' stop-color='#8051F1' stop-opacity='0' />
                  </radialGradient>
                </defs>
              </svg>
            </a>
          </div>
        );
      case 'claim':
        return (
          <div className='claim' onClick={handleTaskAction}>
            <svg
              width='71'
              height='24'
              viewBox='0 0 71 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <g filter='url(#filter0_b_87_159)'>
                <rect
                  x='0.5'
                  width='70'
                  height='24'
                  rx='12'
                  fill='url(#paint0_radial_87_159)'
                  fill-opacity='0.2'
                />
                <rect
                  x='1'
                  y='0.5'
                  width='69'
                  height='23'
                  rx='11.5'
                  stroke='url(#paint1_radial_87_159)'
                />
                <rect
                  x='1'
                  y='0.5'
                  width='69'
                  height='23'
                  rx='11.5'
                  stroke='url(#paint2_radial_87_159)'
                />
                <path
                  d='M18.375 15.75V15.125H17.75V14.5H17.125V8.25H17.75V7.625H18.375V7H22.125V7.625H22.75V8.25H23.375V9.5H22.125V8.875H21.5V8.25H19V8.875H18.375V13.875H19V14.5H21.5V13.875H22.125V13.25H23.375V14.5H22.75V15.125H22.125V15.75H18.375ZM25.875 15.75V14.5H27.125V8.25H25.875V7H28.375V14.5H29.625V15.75H25.875ZM36.5 14.5V13.875H37.125V10.75H36.5V10.125H34V10.75H33.375V13.875H34V14.5H36.5ZM33.375 15.75V15.125H32.75V14.5H32.125V10.125H32.75V9.5H33.375V8.875H36.5V9.5H37.125V8.875H38.375V15.75H37.125V15.125H36.5V15.75H33.375ZM40.875 15.75V14.5H42.125V10.125H40.875V8.875H43.375V14.5H44.625V15.75H40.875ZM42.125 8.25V7H43.375V8.25H42.125ZM47.125 15.75V8.875H48.375V9.5H49V8.875H50.25V9.5H50.875V8.875H52.125V9.5H52.75V10.125H53.375V15.75H52.125V10.75H51.5V10.125H50.875V15.75H49.625V10.125H49V10.75H48.375V15.75H47.125Z'
                  fill='#00D98E'
                />
              </g>
              <defs>
                <filter
                  id='filter0_b_87_159'
                  x='-50.7103'
                  y='-51.2103'
                  width='172.421'
                  height='126.421'
                  filterUnits='userSpaceOnUse'
                  color-interpolation-filters='sRGB'>
                  <feFlood flood-opacity='0' result='BackgroundImageFix' />
                  <feGaussianBlur
                    in='BackgroundImageFix'
                    stdDeviation='25.6051'
                  />
                  <feComposite
                    in2='SourceAlpha'
                    operator='in'
                    result='effect1_backgroundBlur_87_159'
                  />
                  <feBlend
                    mode='normal'
                    in='SourceGraphic'
                    in2='effect1_backgroundBlur_87_159'
                    result='shape'
                  />
                </filter>
                <radialGradient
                  id='paint0_radial_87_159'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='translate(11.2236 5.04989) rotate(18.7925) scale(66.6633 44.0548)'>
                  <stop stop-color='#00D98E' />
                  <stop
                    offset='0.770833'
                    stop-color='#00D98E'
                    stop-opacity='0.223958'
                  />
                  <stop offset='1' stop-color='#00D98E' stop-opacity='0' />
                </radialGradient>
                <radialGradient
                  id='paint1_radial_87_159'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='translate(-9.12842 -2.96747) rotate(17.2702) scale(58.9211 66.1387)'>
                  <stop stop-color='#00D98E' />
                  <stop offset='1' stop-color='#00D98E' stop-opacity='0' />
                </radialGradient>
                <radialGradient
                  id='paint2_radial_87_159'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='translate(76.2953 27.0195) rotate(-159.856) scale(56.2365 66.4955)'>
                  <stop stop-color='#00D98E' />
                  <stop offset='1' stop-color='#00D98E' stop-opacity='0' />
                </radialGradient>
              </defs>
            </svg>
          </div>
        );
      case 'claimed':
        return (
          <div className='claimed'>
            <svg
              width='71'
              height='24'
              viewBox='0 0 71 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <g filter='url(#filter0_b_87_205)'>
                <rect
                  x='0.5'
                  width='70'
                  height='24'
                  rx='12'
                  fill='url(#paint0_radial_87_205)'
                  fill-opacity='0.2'
                />
                <rect
                  x='1'
                  y='0.5'
                  width='69'
                  height='23'
                  rx='11.5'
                  stroke='url(#paint1_radial_87_205)'
                />
                <rect
                  x='1'
                  y='0.5'
                  width='69'
                  height='23'
                  rx='11.5'
                  stroke='url(#paint2_radial_87_205)'
                />
                <path
                  d='M11.375 15.75V15.125H10.75V14.5H10.125V8.25H10.75V7.625H11.375V7H15.125V7.625H15.75V8.25H16.375V9.5H15.125V8.875H14.5V8.25H12V8.875H11.375V13.875H12V14.5H14.5V13.875H15.125V13.25H16.375V14.5H15.75V15.125H15.125V15.75H11.375ZM18.875 15.75V14.5H20.125V8.25H18.875V7H21.375V14.5H22.625V15.75H18.875ZM29.5 14.5V13.875H30.125V10.75H29.5V10.125H27V10.75H26.375V13.875H27V14.5H29.5ZM26.375 15.75V15.125H25.75V14.5H25.125V10.125H25.75V9.5H26.375V8.875H29.5V9.5H30.125V8.875H31.375V15.75H30.125V15.125H29.5V15.75H26.375ZM33.875 15.75V14.5H35.125V10.125H33.875V8.875H36.375V14.5H37.625V15.75H33.875ZM35.125 8.25V7H36.375V8.25H35.125ZM40.125 15.75V8.875H41.375V9.5H42V8.875H43.25V9.5H43.875V8.875H45.125V9.5H45.75V10.125H46.375V15.75H45.125V10.75H44.5V10.125H43.875V15.75H42.625V10.125H42V10.75H41.375V15.75H40.125ZM52.625 12V10.75H52V10.125H49.5V10.75H48.875V12H52.625ZM48.875 15.75V15.125H48.25V14.5H47.625V10.125H48.25V9.5H48.875V8.875H52.625V9.5H53.25V10.125H53.875V13.25H48.875V13.875H49.5V14.5H53.875V15.75H48.875ZM59.5 14.5V13.875H60.125V10.75H59.5V10.125H57V10.75H56.375V13.875H57V14.5H59.5ZM56.375 15.75V15.125H55.75V14.5H55.125V10.125H55.75V9.5H56.375V8.875H59.5V9.5H60.125V7H61.375V15.75H60.125V15.125H59.5V15.75H56.375Z'
                  fill='#535356'
                />
              </g>
              <defs>
                <filter
                  id='filter0_b_87_205'
                  x='-50.7103'
                  y='-51.2103'
                  width='172.421'
                  height='126.421'
                  filterUnits='userSpaceOnUse'
                  color-interpolation-filters='sRGB'>
                  <feFlood flood-opacity='0' result='BackgroundImageFix' />
                  <feGaussianBlur
                    in='BackgroundImageFix'
                    stdDeviation='25.6051'
                  />
                  <feComposite
                    in2='SourceAlpha'
                    operator='in'
                    result='effect1_backgroundBlur_87_205'
                  />
                  <feBlend
                    mode='normal'
                    in='SourceGraphic'
                    in2='effect1_backgroundBlur_87_205'
                    result='shape'
                  />
                </filter>
                <radialGradient
                  id='paint0_radial_87_205'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='translate(11.2236 5.04989) rotate(18.7925) scale(66.6633 44.0548)'>
                  <stop stop-color='#535356' />
                  <stop
                    offset='0.770833'
                    stop-color='#535356'
                    stop-opacity='0.223958'
                  />
                  <stop offset='1' stop-color='#535356' stop-opacity='0' />
                </radialGradient>
                <radialGradient
                  id='paint1_radial_87_205'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='translate(-9.12842 -2.96747) rotate(17.2702) scale(58.9211 66.1387)'>
                  <stop stop-color='#535356' />
                  <stop offset='1' stop-color='#535356' stop-opacity='0' />
                </radialGradient>
                <radialGradient
                  id='paint2_radial_87_205'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='translate(76.2953 27.0195) rotate(-159.856) scale(56.2365 66.4955)'>
                  <stop stop-color='#535356' />
                  <stop offset='1' stop-color='#535356' stop-opacity='0' />
                </radialGradient>
              </defs>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='item'>
      <div className='left'>
        <div className='ava'>
          <img src={image} alt='task' />
        </div>
        <div className='info'>
          <div className='task'>{description}</div>
          <div className='friend'>
            <span>{reward}</span>
          </div>
        </div>
      </div>
      <div className='right'>{renderButton()}</div>
    </div>
  );
};
