import React from 'react';
import {
  Container as DragDropContainer,
  DragEndParams
} from 'react-smooth-dnd';
import * as OV from 'online-3d-viewer';

import { useFiles } from 'context';
import { SearchFilesEl } from '../../components';
import { clsxm } from '../../lib';
import { usePrevious } from 'react-use';

interface Props {
  className?: string;
}

export const Dashboard: React.FC<Props> = ({ className = '' }) => {
  const viewerRef = React.useRef<HTMLDivElement>(null);
  const { files, assignedFiles, setAssignedFiles } = useFiles();
  const oldAssignedFiles = usePrevious(assignedFiles);

  function handleDragEnd(result: DragEndParams) {
    // console.log({ result });
    const { isSource, payload, willAcceptDrop } = result;
    setAssignedFiles([...assignedFiles, payload]);
  }

  React.useEffect(() => {
    if (!oldAssignedFiles) return;

    if (oldAssignedFiles.length <= 0 && assignedFiles.length > 0)
      initOV(assignedFiles[0].path);
  }, [assignedFiles, oldAssignedFiles]);
  function initOV(path?: string) {
    if (!viewerRef.current) return;

    OV.SetExternalLibLocation('../libs');

    while (viewerRef.current.lastChild) {
      viewerRef.current.removeChild(viewerRef.current.lastChild);
    }

    if (!path) return;
    console.log({ path });
    // initialize the viewer with the parent element and some parameters
    let viewer = new OV.EmbeddedViewer(viewerRef.current, {
      // camera: new OV.Camera(
      //   new OV.Coord3D(-1.5, 2.0, 3.0),
      //   new OV.Coord3D(0.0, 0.0, 0.0),
      //   new OV.Coord3D(0.0, 1.0, 0.0),
      //   45.0
      // ),
      // backgroundColor: new OV.RGBAColor(255, 255, 255, 255),
      // defaultColor: new OV.RGBColor(200, 200, 200),
      // edgeSettings: new OV.EdgeSettings(false, new OV.RGBColor(0, 0, 0), 1)
      // environmentSettings: new OV.EnvironmentSettings(
      //   [
      //     'assets/envmaps/fishermans_bastion/posx.jpg',
      //     'assets/envmaps/fishermans_bastion/negx.jpg',
      //     'assets/envmaps/fishermans_bastion/posy.jpg',
      //     'assets/envmaps/fishermans_bastion/negy.jpg',
      //     'assets/envmaps/fishermans_bastion/posz.jpg',
      //     'assets/envmaps/fishermans_bastion/negz.jpg'
      //   ],
      //   false
      // )
    });

    // load a model providing model urls
    viewer.LoadModelFromUrlList(['models/' + path]);
  }

  return (
    <div className={clsxm('dashboard', 'flex flex-col', className)}>
      <SearchFilesEl />
      <div
        className={clsxm(
          'assigned-file-list-container',
          'flex min-h-[240px] py-[8px] px-[16px]'
        )}
      >
        <DragDropContainer
          groupName="1"
          getChildPayload={(index) => assignedFiles[index]}
          onDragEnd={(result) => handleDragEnd(result)}
          render={(ref) => (
            <div
              ref={ref}
              className={clsxm(
                'assigned-file-list',
                'w-[40%] border-[1px] rounded-[4px]'
              )}
            >
              {assignedFiles.map((file, index) => (
                <div
                  key={index}
                  className={clsxm('p-2 flex items-center mt-2 cursor-pointer')}
                  onClick={() => initOV(file.path)}
                >
                  <span className={clsxm('ml-2')}>
                    {file.title}({file.path})
                  </span>
                </div>
              ))}
            </div>
          )}
        />
        <div className={clsxm('flex-auto border-[1px] rounded-[4px]')}>
          <div ref={viewerRef} className={clsxm('w-full aspect-video')}></div>
        </div>
      </div>
    </div>
  );
};
