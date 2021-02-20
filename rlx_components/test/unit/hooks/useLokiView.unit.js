import expect from 'expect';
import { renderHook, act } from '@testing-library/react-hooks';
import useLokiView from '../../../src/hooks/useLokiView';
import cuid from 'cuid';

describe('useLokiView', function () {
    describe('existing collection requested', function () {
        describe('new view name requested', function () {
            describe('no criteria specified', function () {
                it('returns all the records in the database for the collection', function () {
                    const viewName = cuid();
                    const { result } = renderHook(() => useLokiView('widget', viewName));
                    const [, count] = result.current;
                    expect(count).toEqual(50);
                });
            });
            describe('find specified', function () {
                beforeEach(function () {});
                it('returns the data subset', function () {
                    const viewName = cuid();
                    const { result } = renderHook(() =>
                        useLokiView('widget', viewName, {
                            find: { sequence: { $gte: 25 } }
                        })
                    );
                    const [, count] = result.current;
                    expect(count).toEqual(25);
                });
                describe('a second render with the same criteria', function () {
                    it('returns the same results', function () {
                        const viewName = cuid();
                        const { result, rerender } = renderHook(() =>
                            useLokiView('widget', viewName, {
                                find: { sequence: { $gte: 25 } }
                            })
                        );
                        rerender();
                        const [, count] = result.current;
                        expect(count).toEqual(25);
                    });
                });
                describe('a second render with different criteria', function () {
                    it('returns new results', function () {
                        const viewName = cuid();
                        const criteria = { find: { sequence: { $gte: 25 } } };
                        const { result, rerender } = renderHook(() =>
                            useLokiView('widget', viewName, criteria)
                        );
                        delete criteria.find.sequence.$gte;
                        criteria.find.sequence = { $lt: 35 };
                        rerender();
                        const [, count] = result.current;
                        expect(count).toEqual(35);
                    });
                });
            });
            describe('sort specified', function () {
                it('orders the data', function () {
                    const viewName = cuid();
                    const { result } = renderHook(() =>
                        useLokiView('widget', viewName, { sort: 'shuffled' })
                    );
                    const [data] = result.current;
                    expect(data[0].shuffled).toEqual(0);
                    expect(data[30].shuffled).toEqual(30);
                    expect(data[49].shuffled).toEqual(49);
                });
                describe('sort is changed', function () {
                    it('sorts the data', function () {
                        const viewName = cuid();
                        const viewCriteria = { sort: 'shuffled' };
                        const { result, rerender } = renderHook(() =>
                            useLokiView('widget', viewName, viewCriteria)
                        );
                        let [data] = result.current;
                        expect(data[0].shuffled).toEqual(0);
                        expect(data[30].shuffled).toEqual(30);
                        expect(data[49].shuffled).toEqual(49);
                        viewCriteria.sort = 'sequence';
                        rerender();
                        [data] = result.current;
                        expect(data[0].sequence).toEqual(0);
                        expect(data[30].sequence).toEqual(30);
                        expect(data[49].sequence).toEqual(49);
                    });
                });
            });
            describe('page size is specified', function () {
                describe('a sort is specified', function () {
                    it('creates an index for the sort', function () {
                        const viewName = cuid();
                        const viewCriteria = {
                            sort: 'shuffled',
                            pageSize: 10
                        };
                        const { result } = renderHook(() =>
                            useLokiView('widget', viewName, viewCriteria)
                        );
                        const [, , view] = result.current;
                        expect(view.collection.binaryIndices).toIncludeKey('shuffled');
                    });
                });
                describe('first page request', function () {
                    it('returns the first page', function () {
                        const viewName = cuid();
                        // first get the records without paging
                        const viewCriteria = {
                            sort: 'shuffled',
                            find: { sequence: { $gte: 25 } }
                        };
                        const { result, rerender } = renderHook(() =>
                            useLokiView('widget', viewName, viewCriteria)
                        );

                        const [unpagedData] = result.current;
                        // add paging
                        viewCriteria.pageSize = 10;
                        rerender();
                        const [pagedData] = result.current;
                        expect(pagedData.length).toEqual(10);
                        expect(pagedData[0].shuffled).toEqual(unpagedData[0].shuffled);
                        expect(pagedData[4].shuffled).toEqual(unpagedData[4].shuffled);
                        expect(pagedData[9].shuffled).toEqual(unpagedData[9].shuffled);
                    });
                });
                describe('second page requested', function () {
                    it('returns the second page', function () {
                        const viewName = cuid();
                        // first get the records without paging
                        const viewCriteria = {
                            sort: 'shuffled',
                            find: { sequence: { $gte: 25 } }
                        };
                        const { result, rerender } = renderHook(() =>
                            useLokiView('widget', viewName, viewCriteria)
                        );

                        const [unpagedData] = result.current;
                        // add paging
                        viewCriteria.pageSize = 10;
                        viewCriteria.page = 1;
                        rerender();
                        const [pagedData] = result.current;
                        expect(pagedData.length).toEqual(10);
                        expect(pagedData[0].shuffled).toEqual(unpagedData[10].shuffled);
                        expect(pagedData[4].shuffled).toEqual(unpagedData[14].shuffled);
                        expect(pagedData[9].shuffled).toEqual(unpagedData[19].shuffled);
                    });
                });
            });
        });
    });
});
