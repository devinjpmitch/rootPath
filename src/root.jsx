import React from 'react';
import { ipcRenderer } from 'electron';
import { Banner, BasicInput, TableListRow, Button } from '@getflywheel/local-components';
class RootPath extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rootPath: 'public/',
			updating: false,
		};
	}
	componentDidMount() {
		this.getPath();
	}
	getPath() {
		const { site } = this.props;
		ipcRenderer.send('getPath', site.path);
		ipcRenderer.once('site-path', (event, sitePath) => {
			this.setState({
				rootPath: sitePath ?? 'public/',
				updating: false,
			});
		});
	}

	setPath() {
		this.setState({ updating: true });
		const { site } = this.props;
		const { rootPath } = this.state;
		ipcRenderer.send('setPath', site.id, site.path, rootPath);
		setTimeout(() => {
			this.setState({ updating: false });
			this.getPath();
		}, 2000);
	}
	render() {
		const { rootPath, updating } = this.state;
		return (
			<>
				<div class="rootPath">
					<Banner>
						If you wish to use a custom root path, please enter it below.
					</Banner>
					<TableListRow key="rootpath" label="Root Path">
						<BasicInput
							value={rootPath}
							className="inputText"
							onChange={(event) => {
								this.setState({ rootPath: event.target.value });
							}}
							style={{ padding: '0.5rem 1rem' }}
						/>
						<Button
							disabled={updating ? 'true' : ''}
							style={{ float: 'right' }}
							onClick={() => this.setPath()}
						>{updating ? 'Applied' : 'Apply'}</Button>
					</TableListRow>
				</div>
			</>
		);
	}
}

export default RootPath;
