import React from 'react';
import './faceRecognition.css';

const faceRecognition = ({ box, imageUrl }) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2 bt bw2 b--white-80'>
				<img id='input-image' src={imageUrl} width='500' height='auto' alt=''/>
				{
					// map all the boxes or faces found
					box.map((boxArea,i) => {
						return (
							<div
								className='bounding-box'
								key = {i}
								// loop the boxes found and give them their respective values
								// style will then form a box with the values given from clarafai api
								style={{
									top: box[i].topRow,
									right: box[i].rightCol,
									left: box[i].leftCol,
									bottom: box[i].bottomRow}}
							>
							</div>
						);
					})
				}
			</div>
			
		</div>
		);
}

export default faceRecognition;