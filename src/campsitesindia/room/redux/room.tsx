import React, {useEffect, useState} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Row, Table} from 'reactstrap';
import {getSortState, JhiItemCount, JhiPagination, TextFormat, Translate} from 'react-jhipster';


import {getEntities} from './room.reducer';
import {APP_DATE_FORMAT} from '../../config/constants';
import {ASC, DESC, ITEMS_PER_PAGE, SORT} from '../../util/pagination.constants';
import {overridePaginationStateWithQueryParams} from '../../util/entity-utils';
import {useAppDispatch, useAppSelector} from '../../config/store';

export const Room = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const roomList = useAppSelector(state => state.room.entities);
  const loading = useAppSelector(state => state.room.loading);
  const totalItems = useAppSelector(state => state.room.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const { match } = props;

  return (
    <div>
      <h2 id="room-heading" data-cy="RoomHeading">
        <Translate contentKey="campsitesindiaApp.room.home.title">Rooms</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            {/*<FontAwesomeIcon icon="sync" spin={loading} />{' '}*/}
            <Translate contentKey="campsitesindiaApp.room.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            {/*<FontAwesomeIcon icon="plus" />*/}
            &nbsp;
            <Translate contentKey="campsitesindiaApp.room.home.createLabel">Create new Room</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {roomList && roomList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="campsitesindiaApp.room.id">ID</Translate>
                </th>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="campsitesindiaApp.room.name">Name</Translate>
                </th>
                <th className="hand" onClick={sort('roomNumber')}>
                  <Translate contentKey="campsitesindiaApp.room.roomNumber">Room Number</Translate>
                </th>
                <th className="hand" onClick={sort('isSmoking')}>
                  <Translate contentKey="campsitesindiaApp.room.isSmoking">Is Smoking</Translate>
                </th>
                <th className="hand" onClick={sort('status')}>
                  <Translate contentKey="campsitesindiaApp.room.status">Status</Translate>
                </th>
                <th className="hand" onClick={sort('createdBy')}>
                  <Translate contentKey="campsitesindiaApp.room.createdBy">Created By</Translate>
                </th>
                <th className="hand" onClick={sort('createdDate')}>
                  <Translate contentKey="campsitesindiaApp.room.createdDate">Created Date</Translate>
                </th>
                <th className="hand" onClick={sort('updatedBy')}>
                  <Translate contentKey="campsitesindiaApp.room.updatedBy">Updated By</Translate>
                </th>
                <th className="hand" onClick={sort('updateDate')}>
                  <Translate contentKey="campsitesindiaApp.room.updateDate">Update Date</Translate>
                </th>
                <th>
                  <Translate contentKey="campsitesindiaApp.room.roomType">Room Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {roomList.map((room, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${room.id}`} color="link" size="sm">
                      {room.id}
                    </Button>
                  </td>
                  <td>{room.name}</td>
                  <td>{room.roomNumber}</td>
                  <td>{room.isSmoking}</td>
                  <td>{room.status}</td>
                  <td>{room.createdBy}</td>
                  <td>{room.createdDate ? <TextFormat type="date" value={room.createdDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{room.updatedBy ? <TextFormat type="date" value={room.updatedBy} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{room.updateDate ? <TextFormat type="date" value={room.updateDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{room.roomType ? <Link to={`room-type/${room.roomType.id}`}>{room.roomType.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${room.id}`} color="info" size="sm" data-cy="entityDetailsButton">

                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${room.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >

                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${room.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >

                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="campsitesindiaApp.room.home.notFound">No Rooms found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={roomList && roomList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Room;
